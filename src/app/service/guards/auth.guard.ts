import { Injectable } from '@angular/core';
import { CanActivate,  CanActivateChild } from '@angular/router';
import { AuthService } from '../rest/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService) {

  }

  canActivate(): boolean{
    if (this.authService.verifyTokent()) {
      return true;
    } else{
      this.authService.logOut().subscribe(respuesta => {
        if (respuesta != null) {
          window.location.replace('/');
          localStorage.clear();
          return false;
        }
      });
    }
  }

  canActivateChild(): boolean{
    if (this.authService.verifyTokent()) {
      return true;
    } else{
      this.authService.logOut().subscribe(respuesta => {
        if (respuesta != null) {
          window.location.replace('/');
          localStorage.clear();
          return false;
        }
      });
    }
  }

}
