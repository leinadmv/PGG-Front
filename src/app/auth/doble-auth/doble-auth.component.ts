import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doble-auth',
  templateUrl: './doble-auth.component.html',
  styleUrls: ['./doble-auth.component.css']
})
export class DobleAuthComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { }

  loginForm: FormGroup;

  ngOnInit(): void {

    this.formControl();
 
  }

  formControl(): void {
   this.loginForm = new FormGroup({
   code: new FormControl('', [ Validators.required,]),
    
   });
    
  }

  get error(): any {
    return this.loginForm.controls;
  }

  authSms(loginForm) {

    const user = new FormData();
    
    user.append('code', loginForm.value.code);

    this.authService.dobleAuth(user).subscribe((resp)=>{

      localStorage.setItem('user', resp.access_token);

      this.router.navigate(['/']);

    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido autenticar su usuario!',
      })
    }
  )}
}
