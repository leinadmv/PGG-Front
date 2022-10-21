import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from 'src/app/service/rest/business.service';
import { VisualService } from 'src/app/service/rest/visual.service';
import { CreateBusinessComponent } from '../create-business/create-business.component';
import Swal from 'sweetalert2';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.css']
})
export class AdminBusinessComponent implements OnInit {

  color: any;
  categoria: any;
  infoBusiness: any = null;
  idCategories: any;

  constructor(private route: ActivatedRoute, private busineesService: BusinessService, public visualService: VisualService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    this.color = localStorage.getItem('color');
    this.visualService.changeColor(this.color);

    this.idCategories = this.route.snapshot.paramMap.get('id');
    this.categoria = JSON.parse(localStorage.getItem('menu')).find(x => x.id === +this.idCategories);

    const idCategorie = new FormData();
		idCategorie.append('idCategory', this.idCategories);

    this.busineesService.getBusiness(idCategorie).subscribe(resp => {
      this.infoBusiness = resp;
      this.infoBusiness['categoria'] = this.categoria;
      this.infoBusiness['accion'] = 'crear';
    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo obtener el negocio!',
      });
    });

  }

  createBusiness(){

    this.router.navigate(['/app/create-business']);
    this.busineesService.createBusiness(this.infoBusiness);

  }

  cargaMasiva(){
    this.dialog.open(CargaMasivaComponent,{
      width: '50%',
      panelClass: 'custom-dialog-container',
      data: this.idCategories
    });
  }

}
