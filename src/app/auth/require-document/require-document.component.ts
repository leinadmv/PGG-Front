import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-require-document',
  templateUrl: './require-document.component.html',
  styleUrls: ['./require-document.component.css']
})
export class RequireDocumentComponent implements OnInit {

  loginForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, public dialogRef: MatDialogRef<RequireDocumentComponent>) { }

  ngOnInit(): void {

    this.formControl();
 
   }

   formControl(): void {
    this.loginForm = new FormGroup({
    documentNumber: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
     
    });

}

get error(): any {
  return this.loginForm.controls;
}

requireAuth(loginForm) {

  const user = new FormData();
		user.append('idUser',this.data.id);
		user.append('myDocumentNumber', loginForm.value.documentNumber);

    this.authService.restorePassword(user).subscribe((resp)=>{

      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: resp.message,
      });

      this.dialogRef.close();
  
    }), error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido restablecer la contraseña!',
      })
    }
    


  




}
}
