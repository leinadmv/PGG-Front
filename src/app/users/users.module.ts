import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutes } from './users.routing';
import { RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { DemoMaterialModule } from '../demo-material-module';

@NgModule({
  declarations: [
    AdminUsersComponent,
    CreateUsersComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    DemoMaterialModule,
  ]
})
export class UsersModule { }

