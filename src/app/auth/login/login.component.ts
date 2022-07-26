import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup;

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {

    this.formControl ();

  }

  formControl(): void {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)])
    });
  }

  get error(): any {
    return this.loginForm.controls;
  }

  loginAuth(loginForm) {

    const user = new FormData();
		user.append('email', loginForm.value.user);
		user.append('password', loginForm.value.password);
		localStorage.clear();

    this.authService.Authentification(user).subscribe( resp => {

      localStorage.setItem('user', resp.access_token);
      localStorage.setItem('menu', JSON.stringify(resp.data.menu));

        if(resp.accion === 'change_password'){  
          this.router.navigate(['/restorePassword']);
        } else if(resp.accion === 'doble_authentication'){
          this.router.navigate(['/dobleAuth']);
        } else {
          this.router.navigate(['/app']);
        }
      
    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña invalido!',
      })
    }
    )


  }
}
