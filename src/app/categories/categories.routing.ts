import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';

export const CategoriesRoutes: Routes = [
  {
    path: 'admin-categories',
    component: AdminCategoriesComponent 
  },

];

