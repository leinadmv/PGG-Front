import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  hide: boolean = true;
  hide2: boolean = true;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.formControl ();
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

  loginAuth(loginForm) {

    const password = new FormData();
		password.append('newPassword', loginForm.value.confirmpassword);

    this.authService.changePassword(password).subscribe( resp => {

      if(resp.code === 404){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo realizar el cambio de contraseña!',
        })
      } else {
        this.router.navigate(['/']);
      }
      
    }, error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo realizar el cambio de contraseña!',
      })
    }
    )


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
