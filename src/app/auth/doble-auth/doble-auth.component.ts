import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doble-auth',
  templateUrl: './doble-auth.component.html',
  styleUrls: ['./doble-auth.component.css']
})
export class DobleAuthComponent implements OnInit, OnDestroy{

  interval:any;

  constructor( private authService: AuthService, private router: Router ) { }
  
  ngOnDestroy(): void {

clearInterval(this.interval);

  }

  loginForm: FormGroup;

  ngOnInit(): void {

    this.formControl(); 


    this.interval = setTimeout(() => {
      this.router.navigate(['/']);
  }, 120000);  
  }

  formControl(): void {
   this.loginForm = new FormGroup({
    code: new FormControl('', [ Validators.required]),
   });
    
  }

  get error(): any {
    return this.loginForm.controls;
  }


  authSms(loginForm) {

    const user = new FormData();
    
    user.append('code', loginForm.value.code);

    this.authService.dobleAuth(user).subscribe((resp)=>{

      this.router.navigate(['/app']);

    }, error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido autenticar su usuario!',
      })
    }
  )}
}
