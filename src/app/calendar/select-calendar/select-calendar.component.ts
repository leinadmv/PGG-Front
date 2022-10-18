import { Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarService } from 'src/app/service/rest/calendar.service';
import { UsersService } from 'src/app/service/rest/users.service';
import Swal from 'sweetalert2';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-calendar',
  templateUrl: './select-calendar.component.html',
  styleUrls: ['./select-calendar.component.css']
})
export class SelectCalendarComponent implements OnInit {

  Form: FormGroup;
  users: any = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService, private calendarService: CalendarService) { }

  async ngOnInit(): Promise<void> {
    this.formControl();
    this.users = await this.userService.getUsers().toPromise();
    console.log(this.users);

  }

  get error(): any { return this.Form.controls; } 

  formControl() {

    this.Form = new FormGroup({

      fechaStart: new FormControl('', []),
      fechaEnd: new FormControl('', []),
      titulo: new FormControl('', [Validators.required, Validators.minLength(7)]),
      descripcion: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      usuarios: new FormControl('', [Validators.required])

    });

    this.Form.get('fechaStart').setValue(this.data.startStr);
    this.Form.get('fechaEnd').setValue(this.data.endStr);
    this.Form.get('fechaStart').disable();
    this.Form.get('fechaEnd').disable();

  }

  save(form: any){

    let usuarios = [];

    this.Form.get('usuarios').value.forEach(element => {
      usuarios.push(element.email);
    });

    const recordatorio = new FormData();
		recordatorio.append('start', this.Form.get('fechaStart').value);
    recordatorio.append('end', this.Form.get('fechaEnd').value);  
    recordatorio.append('title', this.Form.get('titulo').value);  
    recordatorio.append('description', this.Form.get('descripcion').value);  
    recordatorio.append('timeAlert', JSON.stringify({'time':[this.Form.get('hora').value]}));  
    recordatorio.append('sendTo', JSON.stringify({'mail': usuarios}));    

    this.calendarService.saveNotification(recordatorio).subscribe(resp =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: resp.message,
      });
    });

  }

}
