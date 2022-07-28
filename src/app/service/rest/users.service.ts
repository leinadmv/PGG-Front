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

createOrEdit(type: any, row?: any) {
  this.modeloCreateOrEdit = {
    'type': type,
    'row': row
  }
  return this.modeloCreateOrEdit;
}

responseCreateOrEdit(){
  return this.modeloCreateOrEdit;
}




}

