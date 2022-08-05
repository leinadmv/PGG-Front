import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutes} from './categories.routing';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriesRoutes),
    DemoMaterialModule,
    ReactiveFormsModule,
  ]
})
export class CategoriesModule { }
