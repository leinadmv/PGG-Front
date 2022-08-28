import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessRoutes } from './business.routing';
import { AdminBusinessComponent } from './admin-business/admin-business.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateBusinessComponent } from './create-business/create-business.component';


@NgModule({
  declarations: [
    AdminBusinessComponent,
    CreateBusinessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessRoutes),
    DemoMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BusinessModule { }
