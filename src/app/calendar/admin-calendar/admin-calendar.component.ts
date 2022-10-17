import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import { SelectCalendarComponent } from '../select-calendar/select-calendar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    selectable: true,
    customButtons: {
      prev: {
        click: this.goPrev.bind(this),
      },
      today: {
        text: 'Hoy',
        click: this.goPrev.bind(this),
      },
      next: {
        click: this.goPrev.bind(this),
      },
    },
    plugins: [ interactionPlugin, dayGridPlugin ],
    //dateClick: this.dateClick.bind(this),
    select: this.dateClick.bind(this),
    events: [
      {
        id:'a', 
        title: 'mi evento', 
        start:'2022-10-19T10:30:00',
        end: '2022-10-19T18:30:00',
      }
    ]
    
  };

  constructor(public dialog: MatDialog) { 
    const name = Calendar.name;
  }

  ngOnInit(): void { }

  dateClick(arg){
    console.log(arg);
    this.dialog.open(SelectCalendarComponent,{
      width: '50%',
      panelClass: 'custom-dialog-container',
      data: arg
    });
  }

  goPrev(arg){

    console.log(arg);
  }

}
