import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutes } from './calendar.routing';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { SelectCalendarComponent } from './select-calendar/select-calendar.component'; 

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AdminCalendarComponent,
    SelectCalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CalendarRoutes),
    DemoMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FullCalendarModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CalendarModule { }