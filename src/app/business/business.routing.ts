import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBusinessComponent } from './admin-business/admin-business.component';

export const BusinessRoutes: Routes = [
  {
    path: 'admin-business/:id',
    component: AdminBusinessComponent
  }
];
