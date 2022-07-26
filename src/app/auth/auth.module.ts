import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutes } from './auth.routing'
import { RouterModule } from '@angular/router';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { LoginComponent } from './login/login.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RestorePasswordComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    DemoMaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
