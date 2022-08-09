import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { DobleAuthComponent } from './auth/doble-auth/doble-auth.component';

export const AppRoutes: Routes = [
  {
<<<<<<< HEAD
    path: 'app',
=======
    path: 'login',
    component: LoginComponent
  },{
    path: '',
>>>>>>> b022589710809131a269f98e44f92dda1663f6f6
    component: FullComponent,
    children: [
      /* {
        path: '',
<<<<<<< HEAD
        redirectTo: 'dashboard',
=======
        redirectTo: '/dashboard', 
>>>>>>> b022589710809131a269f98e44f92dda1663f6f6
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
    ]
  },
  {
<<<<<<< HEAD
    path: '',
    component: LoginComponent
  },
  {
=======
>>>>>>> b022589710809131a269f98e44f92dda1663f6f6
    path: 'restorePassword',
    component: RestorePasswordComponent
  },
  {
    path: 'dobleAuth',
    component: DobleAuthComponent
  }


];
