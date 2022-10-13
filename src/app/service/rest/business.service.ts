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

  modeloCreate: any;

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

  duplicateSeccion(data): any {

    return this.http.post<any>(`${PGG_URL}duplicateSection/duplicateSection`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  createBusiness(data) {
    this.modeloCreate = data;
  }
  
  responseCreate(){
    return this.modeloCreate;
  }

  saveForm(form){

    return this.http.post<any>(`${PGG_URL}formsBussines/saveBussines`, form)
      .pipe(
        catchError(this.handleError)
    );

  }

  downloadTemplate(idBusiness: any){

    return this.http.post<any>(`${PGG_URL}files/getTemplatePerCategory`, idBusiness)
      .pipe(
        catchError(this.handleError)
    );

  }

  cargarTemplate(file: any){

    return this.http.post<any>(`${PGG_URL}files/setTemplatePerCategory`, file)
      .pipe(
        catchError(this.handleError)
    );
  }

  
}
