import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { saveAs as importedSaveAs } from 'file-saver';
import { BusinessService } from 'src/app/service/rest/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: BusinessService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CargaMasivaComponent>) { 
  }

  ngOnInit(): void {
  }

  descargarPlantilla(){
    const idCategorie = new FormData();
		idCategorie.append('idCategory', this.data);
    this.service.downloadTemplate(idCategorie).subscribe(async resp => {
      importedSaveAs(resp.data.template);
    })
    
  }

  cargarPlantilla(event){
  
    const archivo = new FormData();
		archivo.append('idCategory', this.data);
    archivo.append('file', event.target.files[0]);

    this.service.cargarTemplate(archivo).subscribe(resp => {
      this.dialogRef.close();
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: resp.message,
      });
    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo realizar el cargue del archivo ' + error.message,
      });
    })

  }


}
