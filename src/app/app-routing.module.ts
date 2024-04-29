import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './user-details/login-page/login-page.component';
import { RegistrationPageComponent } from './user-details/registration-page/registration-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'register',
    component:RegistrationPageComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
