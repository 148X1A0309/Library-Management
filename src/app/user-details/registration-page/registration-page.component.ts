import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Key } from 'protractor';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registerForm: FormGroup;
  roles = [
    { id: 1, name: 'Student' },
    { id: 2, name: 'Librarian' },
    { id: 3, name: 'Admin' }
  ]
  constructor(private formBuilder: FormBuilder, private userService: UserInfoService) { }

  ngOnInit() {
    this.register();
  }

  register() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, passwordValidator()]],
      userPhone: ['', [Validators.required, phoneNumberValidator()]],
      userRole: ['', Validators.required]
    })
  }

  signUp() {
    if (this.registerForm.valid) {
      this.userService.signUpUser(this.registerForm.value).subscribe(res => {
        console.log(res);
      })
    }
  }
}


export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [Key: string]: any } | null => {
    const phoneNumber = control.value;
    if (!phoneNumber || phoneNumber.length !== 10) {
      return { 'phoneNumberLength': true }
    }
    return null;
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
