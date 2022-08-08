import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const PGG_URL = environment.backPgg;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  modeloCreateOrEdit: any;

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) { }
  handleError(error: HttpErrorResponse): any {
    return throwError(error);

}

getUsers(): Observable<any> {
  return this.http.get<any>(`${PGG_URL}users/list`)
    .pipe(
      catchError(this.handleError)
    );
}

createOrEdit(type: any, tittle: any, row?: any) {
  this.modeloCreateOrEdit = {
    'type': type,
    'tittle': tittle,
    'row': row
  }
  return this.modeloCreateOrEdit;
}

responseCreateOrEdit(){
  return this.modeloCreateOrEdit;
}

saveUser(users): Observable<any> {
  return this.http.post<any>(`${PGG_URL}users/create`, users)
    .pipe(
      catchError(this.handleError)
    );
}

updateUser(user): Observable<any> {
  return this.http.post<any>(`${PGG_URL}users/edit`,user)
    .pipe(
      catchError(this.handleError)
    );
}

getSelect(): Observable<any> {
  return this.http.get<any>(`${PGG_URL}users/bringSelectData`)
  .pipe(
    catchError(this.handleError)
  );
}

changeState(state: any):Observable<any>{
  return this.http.post<any>(`${PGG_URL}users/state`, state)
  .pipe(
    catchError(this.handleError)
  );
}

getUserWhitToken(): Observable<any> {
  return this.http.post<any>(`${PGG_URL}token/me`, null)
  .pipe(
    catchError(this.handleError)
  );
}

saveupPhoto(photo): Observable<any> {
  return this.http.post<any>(`${PGG_URL}users/savePhoto`, photo)
    .pipe(
      catchError(this.handleError)
    );
}
}
