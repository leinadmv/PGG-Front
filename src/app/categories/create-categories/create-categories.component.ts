import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/service/rest/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  createForm: FormGroup;
  modelo: any;
  select: any;

  constructor(private categsService: CategoriesService, private router: Router) { }

  ngOnInit(): void {

    this.categsService.selectCategories(this.categsService).subscribe((resp) => {
      this.select = resp.data.categories;
    });

    this.formControl();
    this.modelo = this.categsService.responseCategoriesCreateOrEdit();

    if(this.modelo?.row){
      this.setEdit(this.modelo.row);
    }

    if(this.modelo?.type === 'ver'){
      this.createForm.disable();
    }

  }

  get error(): any { return this.createForm.controls; } 

  formControl() {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, ]),
      description: new FormControl('', [Validators.required,]),   
      configuration: new FormControl('', [Validators.required,]),    });
  }

saveCategories(type, createCategory) {

  const categories = {

    name: createCategory.value.name,
    description: createCategory.value.description,
    configuration: createCategory.value.configuration,
}

if(type === 'crear'){

  this.categsService.saveCategories(categories).subscribe((resp) => {

    this.createForm.reset();
    Swal.fire(
     'Creada!',
     resp.message,
      'success'
    )
    
  }),error=>{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se ha podido crear la categoria de negocio!',
    })

    this.router.navigate(['/app/']);
    
  };

} else if(type === 'editar') {

  categories['id'] = this.modelo.row.id

  this.categsService.updateCategories(categories).subscribe((resp) => {

    Swal.fire(
     'Editada!',
     resp.message,
      'success'
    )
  }), error=>{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se ha podido editar la categoria de negocio!',
    })
  }
}
} 
  setEdit(row: any ) {
     this.createForm.controls.name.setValue(row.name);
    this.createForm.controls.description.setValue(row.description);
    this.createForm.controls.configuration.setValue(row.configuration);

  }

  
  
}
