import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';

export const CalendarRoutes: Routes = [
  {
    path: 'admin-calendar/:id',
    component: AdminCalendarComponent
  }
];
