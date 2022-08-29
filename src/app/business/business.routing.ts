import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBusinessComponent } from './admin-business/admin-business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';

export const BusinessRoutes: Routes = [
  {
    path: 'admin-business/:id',
    component: AdminBusinessComponent
  },
  {
    path: 'create-business',
    component: CreateBusinessComponent
  },
];
