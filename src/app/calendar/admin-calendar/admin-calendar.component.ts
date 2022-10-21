import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import { SelectCalendarComponent } from '../select-calendar/select-calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from 'src/app/service/rest/calendar.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {

  notifications: any = [];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  Month: any = '';
  Year: any = '';
  band: boolean = false;


  constructor(public dialog: MatDialog, private service: CalendarService) { 
    const name = Calendar.name;
    this.Month = moment().locale('es').format('MM');
    this.Year = moment().locale('es').format('YYYY');
    this.configuracion();    
  }

  ngOnInit() {

  }

  async configuracion(){

    await this.consultarNotificaciones();

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      selectable: true,
      plugins: [ interactionPlugin, dayGridPlugin ],
      //dateClick: this.dateClick.bind(this),
      customButtons: {
        prev: {
          click: this.goPrev.bind(this),
        },
        today: {
          text: 'Hoy',
          click: this.goToday.bind(this),
        },
        next: {
          click: this.goNext.bind(this),
        },
      },
      select: this.dateClick.bind(this),
      events: this.notifications,
      eventClick: this.eventClick.bind(this)
      /* events: [
        {
          id: '1',
          title: 'mi evento',
          start: '2022-10-19T10:30:00',
          end: '2022-10-19T18:30:00'
        }
      ] */
      
    };

    this.band = true;

  }

  goPrev(arg){

    const calendarApi = this.calendarComponent.getApi();
    calendarApi.prev();
    let date = new Date(calendarApi.getDate());
    this.Month = moment(date).locale('es').format('MM');
    this.Year = moment(date).locale('es').format('YYYY');
    this.consultarNotificaciones();
  }

  goNext(arg){

    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    let date = new Date(calendarApi.getDate());
    this.Month = moment(date).locale('es').format('MM');
    this.Year = moment(date).locale('es').format('YYYY');
    this.consultarNotificaciones();

  }

  goToday(arg){
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.today();
    let date = new Date(calendarApi.getDate());
    this.Month = moment(date).locale('es').format('MM');
    this.Year = moment(date).locale('es').format('YYYY');
    this.consultarNotificaciones();
  }

  async consultarNotificaciones(){

    const dates = new FormData();
		dates.append('Month', this.Month);
    dates.append('Year', this.Year);
    const noti = await this.service.getNotification(dates).toPromise();
    this.notifications = noti.data.notifications;

  }

  dateClick(arg){
    

    if(moment(arg.startStr).isBefore(moment().subtract(1, 'days'))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede seleccionar una fecha anterior al dia de hoy!',
      })
    } else {
      const dialogRef = this.dialog.open(SelectCalendarComponent,{
        width: '40%',
        panelClass: 'custom-dialog-container',
        data: arg
      });

      dialogRef.afterClosed().subscribe(result => {
        this.consultarNotificaciones();
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.today();
        let date = new Date(calendarApi.getDate());
        this.Month = moment(date).locale('es').format('MM');
        this.Year = moment(date).locale('es').format('YYYY');
        this.consultarNotificaciones();
      });
    }

    
  }

  eventClick(arg){
    arg.event._def['accion'] = 'ver';
    const dialogRef = this.dialog.open(SelectCalendarComponent,{
      width: '40%',
      panelClass: 'custom-dialog-container',
      data: arg.event._def
    });

    dialogRef.afterClosed().subscribe(result => {
      this.consultarNotificaciones();
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.today();
      let date = new Date(calendarApi.getDate());
      this.Month = moment(date).locale('es').format('MM');
      this.Year = moment(date).locale('es').format('YYYY');
      this.consultarNotificaciones();
    });
  }

}
