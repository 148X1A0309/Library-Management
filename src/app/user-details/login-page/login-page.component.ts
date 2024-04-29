import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators, FormBuilder,ValidatorFn,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/shared/services/user-info.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm:FormGroup;
  isAuthenticated= false;
  constructor(private router :Router, private formBuilder :FormBuilder,private userService:UserInfoService) { }

  ngOnInit() {
    this.loginUser()
  }

  loginUser() {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, passwordValidator()]],
    })
  }

  login(){
   if( this.loginForm.valid){
    console.log(this.loginForm.value);
    this.userService.loginUser(this.loginForm.value).subscribe((res=>{
       console.log(res);
       if(res){
        this.isAuthenticated = true;
      this.router.navigate(['/dashboard'])
       }
    }))
   }
  }
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [Key: string]: any } | null => {
    const password = control.value;
    if (!password) {
      return null;
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,12}$/;
    if (!regex.test(password)) {
      return { 'passwordInvalid': true }
    }
    return null;
  }
}