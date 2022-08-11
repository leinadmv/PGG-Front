import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutes} from './categories.routing';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriesRoutes),
    DemoMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CategoriesModule { }
