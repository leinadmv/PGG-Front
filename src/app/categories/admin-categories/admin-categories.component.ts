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

  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource =  new MatTableDataSource<any>();
  formulario: any

  constructor(private router: Router , public service : CategoriesService, public visualService: VisualService) { }

  ngOnInit(): void {

    this.getCategories();
    this.visualService.changeColor('gris');
    //
    this.formulario = this.service.getFormulario();
  

  }
  getCategories() {
    this.service.getCategories().subscribe((resp) => {
      this.dataSource.data = resp.data.categories;
    
    });error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido listar las categorias!',
      })
    }
  }



}
