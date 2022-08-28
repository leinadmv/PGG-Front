import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ViewUserComponent } from './view-user/view-user.component';

export const UserRoutes: Routes = [
  {
    path: 'admin-users/:id',
    component: AdminUsersComponent
  },
  {
    path: 'create-users',
    component: CreateUsersComponent
  },
  {
    path: 'view-user',
    component: ViewUserComponent
  },
];

