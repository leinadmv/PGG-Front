import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';

export const UserRoutes: Routes = [
  {
    path: 'admin-users',
    component: AdminUsersComponent
  },
  {
    path: 'create-users',
    component: CreateUsersComponent

  },
]
;

