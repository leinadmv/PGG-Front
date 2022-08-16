import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisualService } from 'src/app/service/rest/visual.service';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/service/rest/categories.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = true;

  displayedColumns: string[] = ['accion', 'estado', 'id', 'name', 'description', 'configuration' ];
  dataSource =  new MatTableDataSource<any>();
  formulario: any='';

  constructor(private router: Router , public categsService : CategoriesService, public visualService: VisualService) { }

  ngOnInit(): void {

    this.getCategories();
    this.visualService.changeColor('catPurple');
    //
    this.formulario = this.categsService.getFormulario();
  

  }
  getCategories() {
    this.categsService.getCategories().subscribe((resp) => {
      this.dataSource.data = resp.data.categories;
    
    });error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido listar las categorias!',
      })
    }
  }

  redirectCategories(row?: any){

    this.router.navigate(['/app/create-categories']);

    if(row){
      this.categsService.categoriesCreateOrEdit('editar', 'Editar categoria', row);
    } else {
      this.categsService.categoriesCreateOrEdit('crear', 'Crear categoria');
    }
}

changeStatus(id: any, status: any){

  if(status === 0){
    status = 1;
  } else if (status === 1) {
    status = 0;
  }

  const estado = new FormData();
  estado.append('id', id);
  estado.append('status', status);

  this.categsService.changeCategoriesState(estado).subscribe(resp => {

    Swal.fire(
      'Editado!',
      resp.message,
       'success'
    )
    
  }, error=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo realizar el cambio de estado!',
    })
  });


}
}
