import { Routes } from '@angular/router';
import { AdminBusinessComponent } from './admin-business/admin-business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { DashboardBusinessComponent } from './dashboard-business/dashboard-business.component';

export const BusinessRoutes: Routes = [
  {
    path: 'dash-business/:id',
    component: DashboardBusinessComponent
  },
  {
    path: 'admin-business/:id',
    component: AdminBusinessComponent
  },
  {
    path: 'create-business',
    component: CreateBusinessComponent
  },
];
