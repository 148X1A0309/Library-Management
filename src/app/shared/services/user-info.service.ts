import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/user-details/login-page/user.model';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  authData = new BehaviorSubject<any>(null)
  constructor(private httpClient: HttpClient, private router: Router) {

  }
  signUpUser(payload) {
    const url = `http://localhost:8010/v1.0/student/create/creatStudent`
    let headers = new HttpHeaders();
    return this.httpClient.post(url, payload, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(payload) {
    const url = `http://localhost:8010/v1.0/student/login/loginUser`
    let headers = new HttpHeaders();
    return this.httpClient.post(url, payload, { headers: headers }).pipe(
      tap((response) => {
        this.handleData(response);
      }),
      catchError(this.handleError)
    );
  }

  checkUser(payload) {
    const url = `http://localhost:8010/v1.0/student/login/getUser/${payload}`
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.get(url, { headers: headers }).pipe(
      tap((response) => {
        this.handleData(response);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.authData.next(null);
    this.router.navigate(['/login'])
  }

  autologout() {
    let userData: {
      userName: string,
      token: string,
      expirationDate: string
    } = JSON.parse(localStorage.getItem('UserInfo'))

    if (!userData) {
      return;
    }
    let user = new User(
      userData.userName,
      userData.token,
      new Date(userData.expirationDate)
    );

    if (user.token) {
      this.authData.next(user);
    }

  }

  handleData(res) {
    const expiryDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    )
    const user = new User(
      res.data.userName,
      res.data.token,
      expiryDate
    )
    console.log(user)
    this.authData.next(user);
    localStorage.setItem('UserInfo', JSON.stringify(user));
  }

  handleError(error) {
    return throwError(error.json());
  }
}
