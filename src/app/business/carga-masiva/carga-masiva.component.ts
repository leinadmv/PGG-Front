import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { saveAs as importedSaveAs } from 'file-saver';
import { BusinessService } from 'src/app/service/rest/business.service';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: BusinessService, @Inject(MAT_DIALOG_DATA) public data: any,) { 
  }

  ngOnInit(): void {
  }

  descargarPlantilla(){
    const idCategorie = new FormData();
		idCategorie.append('idCategory', this.data);
    this.service.downloadTemplate(idCategorie).subscribe(resp => {
      console.log(resp);
    })
    importedSaveAs();
  }

  cargarPlantilla(event){
  
    const archivo = new FormData();
		archivo.append('idCategory', this.data);
    archivo.append('file', event.target.files[0]);

    this.service.cargarTemplate(archivo).subscribe(resp => {
      console.log(resp);
    })

  }

}
