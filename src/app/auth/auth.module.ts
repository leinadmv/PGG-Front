import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutes } from './auth.routing'
import { RouterModule } from '@angular/router';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { LoginComponent } from './login/login.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RequireDocumentComponent } from './require-document/require-document.component';
import { DobleAuthComponent } from './doble-auth/doble-auth.component';


@NgModule({
  declarations: [
    RestorePasswordComponent,
    LoginComponent,
    ChangePasswordComponent,
    RequireDocumentComponent,
    DobleAuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    DemoMaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
