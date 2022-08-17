import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
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
  select: any;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {


    this.userService.getSelect().subscribe((resp) => {
      this.select = resp.data;
    });

    this.formControl();
    this.modelo = this.userService.responseCreateOrEdit();

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
      firstName: new FormControl('', [Validators.required, ]),
      middleName: new FormControl('', []),
      firstLastname: new FormControl('', [Validators.required, ]),
      secondLastname: new FormControl('', [Validators.required, ]),
      fkDocumentType: new FormControl('', [Validators.required, ]),
      documentNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email ]),
      phone: new FormControl('', [Validators.required, Validators.min(999999999)]),
      position: new FormControl('', [Validators.required, ]),
      business: new FormControl('', [Validators.required, ]),
      idRole: new FormControl('', [Validators.required, ]),
    });

  }

  saveUser(type, createUser){

      const user = {
        firstName: createUser.value.firstName,
        middleName: createUser.value.middleName,
        firstLastname: createUser.value.firstLastname,
        secondLastname: createUser.value.secondLastname,
        fkDocumentType: createUser.value.fkDocumentType,
        documentNumber: createUser.value.documentNumber,
        email: createUser.value.email,
        phone: createUser.value.phone,
        position: createUser.value.position,
        business: createUser.value.business,
        idRole: createUser.value.idRole,
        blockIp: 1
      }

if(type === 'crear'){

  this.userService.saveUser(user).subscribe((resp) => {

    this.createForm.reset();
    this.router.navigate(['/app/admin-users']);

    Swal.fire(
     'Creado!',
     resp.message,
      'success'
    )
    
  }),error=>{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se ha podido crear el usuario!',
    })
    
  };

} else if(type === 'editar') {

  user['id'] = this.modelo.row.id

  this.userService.updateUser(user).subscribe((resp) => {

    Swal.fire(
     'Editado!',
     resp.message,
      'success'
    )
  }), error=>{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se ha podido editar el usuario!',
    })
  }
}
} 

  setEdit(row:any) {

    this.createForm.controls.firstName.setValue(row.firstName);
    this.createForm.controls.middleName.setValue(row.middleName);
    this.createForm.controls.firstLastname.setValue(row.firstLastname);
    this.createForm.controls.secondLastname.setValue(row.secondLastname);
    this.createForm.controls.fkDocumentType.setValue(row.fkDocumentType);
    this.createForm.controls.documentNumber.setValue(row.documentNumber);
    this.createForm.controls.email.setValue(row.email);
    this.createForm.controls.phone.setValue(row.phone);
    this.createForm.controls.position.setValue(row.position);
    this.createForm.controls.business.setValue(row.business);
    this.createForm.controls.idRole.setValue(row.idRole);
    
  };

  
}
