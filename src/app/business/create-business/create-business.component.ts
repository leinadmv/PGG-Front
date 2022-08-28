import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessService } from 'src/app/service/rest/business.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent implements OnInit {

  formulario: any;
  band: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private businessService: BusinessService ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  getForm(id){

    const idTypeBusiness = new FormData();
		idTypeBusiness.append('idTypeBusiness', id);

    this.businessService.getForm(idTypeBusiness).subscribe(resp => {
      this.formulario = resp;
      this.band = true;
    });
    
  }

}
