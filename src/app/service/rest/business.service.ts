import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const PGG_URL = environment.backPgg;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor( private http: HttpClient ) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  getBusiness(idCategorie): any {

    return this.http.post<any>(`${PGG_URL}typeBusiness/showPerCategorie`, idCategorie)
      .pipe(
        catchError(this.handleError)
      );
  }

  getForm(id): any {

    return this.http.post<any>(`${PGG_URL}formsBussines/showForm`, id)
      .pipe(
        catchError(this.handleError)
      );
  }

  
}
