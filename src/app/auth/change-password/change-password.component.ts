import { T } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide: boolean = true;
  hide2: boolean = true;
  loginForm: FormGroup;
  

  constructor(private authService: AuthService, public dialog: MatDialog, public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {

  this.formControl();
 
   }

   formControl(): void {
    this.loginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5), this.ObjectValidator()])
     
    });
  }
 
  get error(): any {
    return this.loginForm.controls;
  }

  
  changeAuth(loginForm) {

    const password = new FormData();
		password.append('newPassword', loginForm.value.password);

    this.authService.changePassword(password).subscribe( resp => {

        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: resp.message,
        });
        this.dialogRef.close();
      }, error=>{

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo realizar el cambio de contraseña!',
        });
      })
} 


ObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      if (control.value !== this.loginForm.value.password) {
        return { invalidObject: { value: control.value } };
      } else {
        return null;
      }
    }
    return null;
  };
}


}





