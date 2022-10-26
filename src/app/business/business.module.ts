import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessRoutes } from './business.routing';
import { AdminBusinessComponent } from './admin-business/admin-business.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { CargaMasivaComponent } from './carga-masiva/carga-masiva.component';
import { EditBusinessComponent } from './edit-business/edit-business.component';
import { DashboardBusinessComponent } from './dashboard-business/dashboard-business.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AdminBusinessComponent,
    CreateBusinessComponent,
    CargaMasivaComponent,
    EditBusinessComponent,
    DashboardBusinessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessRoutes),
    DemoMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    NgApexchartsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BusinessModule { }
