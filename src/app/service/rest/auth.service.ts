import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

const PGG_URL = environment.backPgg;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) { }
  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
   * @author Daniel Martinez
   * @createdate 2021-01-27
   * Servicio que se consume en ciu para el logueo y obtencion del login
   * @param user formData con el usuario y el password del usuario
   */
  Authentification(user: FormData): Observable<any> {
    return this.http.post<any>(`${PGG_URL}login`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @author Daniel Martinez
   * @createdate 2021-01-27
   * Servicio que obtiene los datos basicos del usuario del local storage
   */

  getUser(): any {
    return this.decryptToken();
  }

  /**
   * @author Daniel Martinez
   * @createdate 2021-01-27
   * Servicio que verifica si el token esta valido o no
   */

  verifyTokent(): boolean {
    const token = JSON.parse(localStorage.getItem('user'));
    return !this.jwtHelper.isTokenExpired(token.access_token);
  }

  /**
   * @author Daniel Martinez
   * @createdate 2021-02-01
   * Servicio que inhabilita el token y genera el logOut
   */

  logOut(): Observable<any> {

    return this.http.get<any>(`${PGG_URL}auth/logout`)
      .pipe(
        catchError(this.handleError)
      );
  }
  /**
   * @author Daniel Martinez
   * @createdate 2021-07-01
   * Servicio que devuelve el token jwt desencriptado para poder acceder a su informacion sin tener que usar el localStorage
   */

  decryptToken(): any {
    var token = this.getToken();
    if (token === null) {
      return null;
    } else {
      var decoded = jwt_decode(token);
      return decoded;
    }
  }

  getToken(): any {

    var token = localStorage.getItem('user');

    if (token === null) {
      return null;
    } else {
      return token;
    }

  }

  restorePassword(password): any {
    return this.http.post<any>(`${PGG_URL}users/restorePassword`, password)
      .pipe(
        catchError(this.handleError)
      );
  }

}


