import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { DobleAuthComponent } from './auth/doble-auth/doble-auth.component';
import { AuthGuard } from './service/guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: 'app',
    component: FullComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      /* {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, */
      {
        path: '',
        loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: '',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: '',
        loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
      },
    ]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'restorePassword',
    component: RestorePasswordComponent
  },
  {
    path: 'dobleAuth',
    component: DobleAuthComponent
  }


];
