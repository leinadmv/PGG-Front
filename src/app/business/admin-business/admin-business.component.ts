import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from 'src/app/service/rest/business.service';
import { VisualService } from 'src/app/service/rest/visual.service';
import { CreateBusinessComponent } from '../create-business/create-business.component';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.css']
})
export class AdminBusinessComponent implements OnInit {

  color: any;
  categoria: any;
  infoBusiness: any;

  constructor(private route: ActivatedRoute, private busineesService: BusinessService, public visualService: VisualService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.color = localStorage.getItem('color');
    this.visualService.changeColor(this.color);

    const id = this.route.snapshot.paramMap.get('id');
    this.categoria = JSON.parse(localStorage.getItem('menu')).find(x => x.id === +id);

    const idCategorie = new FormData();
		idCategorie.append('idCategorie', id);

    this.busineesService.getBusiness(idCategorie).subscribe(resp => {
      this.infoBusiness = resp;
      this.infoBusiness['categoria'] = this.categoria;
    });

  }

  createBusiness(){
    const dialogRef = this.dialog.open(CreateBusinessComponent,{
      width: '100%',
      panelClass: 'custom-dialog-container',
      data: this.infoBusiness
    });
  }

}
