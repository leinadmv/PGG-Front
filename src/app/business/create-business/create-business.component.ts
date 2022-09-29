import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessService } from 'src/app/service/rest/business.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent implements OnInit {

  formulario: any;
  band: boolean = false;
  select: any;
  data: any = null;
  id: any = 0;

  constructor(private businessService: BusinessService, private _location: Location) { }

  ngOnInit(): void {

    this.data = this.businessService.responseCreate();

    if(!this.data){
      this._location.back();
    }

    this.select = this.data?.data?.selectTypeBussines;
  }

  getForm(id){

    this.band = false;

    const idTypeBusiness = new FormData();
		idTypeBusiness.append('idTypeBusiness', id);
    this.id = id;

    this.businessService.getForm(idTypeBusiness).subscribe(resp => {
      this.formulario = resp;
      this.band = true;
    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo obtener el formulario!',
      });
    });
    
  }

  guardar(evento){

    const formulario = new FormData();
		formulario.append('idTypeBusiness', this.id);
    formulario.append('jsonBussinesData', evento);

    this.businessService.saveForm(formulario).subscribe(resp =>{
      this.band = false;
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se ha guardado su formulario!',
      });
    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo guardar el formulario!',
      });
    });

  }

}
