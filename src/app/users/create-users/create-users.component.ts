import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/service/rest/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  createForm: FormGroup;
  modelo: any;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.formControl();
    this.modelo = this.userService.responseCreateOrEdit();

    if(this.modelo?.row){
      console.log('editar', this.modelo);
      this.setEdit(this.modelo.row);
    }

  }

  get error(): any { return this.createForm.controls; } 

  formControl() {

    this.createForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, ]),
      middleName: new FormControl('', [Validators.required, ]),
      firstLastname: new FormControl('', [Validators.required, ]),
      secondLastname: new FormControl('', [Validators.required, ]),
      fkDocumentType: new FormControl('', [Validators.required, ]),
      ducumentNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email ]),
      phone: new FormControl('', [Validators.required, ]),
      position: new FormControl('', [Validators.required, ]),
      business: new FormControl('', [Validators.required, ]),
    
    });

  }

  savePost(createForm){


      const post = {
        firstName: createForm.value.firstName,
        middleName: createForm.value.middleName,
        firstLastname: createForm.value.firstLastname,
        secondLastname: createForm.value.secondLastname,
        fkDocumentType: createForm.value.fkDocumentType,
        ducumentNumber: createForm.value.ducumentNumber,
        email: createForm.value.email,
        phone: createForm.value.phone,
        position: createForm.value.position,
        business: createForm.value.business,
      }

      console.log(post)

      // //this.service.savePost(post).subscribe((resp) => {
      //   Swal.fire(
      //     'Creado!',
      //     'Usted ha creado un usuario con exito!',
      //     'success'
        // )

       };

  setEdit(row:any) {

    this.createForm.controls.firstName.setValue(row.firstName);

  };

  
}
