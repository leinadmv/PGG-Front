import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const PGG_URL = environment.backPgg;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
   modeloCreateOrEdit: any;

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) { }
  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${PGG_URL}categoriesBussines/showAll`)
      .pipe(
        catchError(this.handleError)
      );
      
  }

  selectCategories(categories): Observable<any> {
    return this.http.post<any>(`${PGG_URL}categoriesBussines/show`,categories)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  categoriesCreateOrEdit(type: any, tittle: any, row?: any) {
    this.modeloCreateOrEdit = {
      'type': type,
      'tittle': tittle,
      'row': row
    }
    return this.modeloCreateOrEdit;
  }

  responseCategoriesCreateOrEdit(){
    return this.modeloCreateOrEdit;
  }

  changeCategoriesState(state: any):Observable<any>{
    return this.http.post<any>(`${PGG_URL}categoriesBussines/changeStatus`, state)
    .pipe(
      catchError(this.handleError)
    );
  }
  
 
  saveCategories(categories): Observable<any> {
    return this.http.post<any>(`${PGG_URL}categoriesBussines/create`,categories)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategories(categories): Observable<any> {
    return this.http.post<any>(`${PGG_URL}categoriesBussines/edit`,categories)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFormulario(){
    

    return [
      {
          "section":"Datos Básicos Inmueble",
          "form":[
              {
                  "name": "Número Inmueble:",
                  "value": "",
                  "label": "hola",
                  "type": "number",
                  "validators": {
                    "required": true,
                    "minLength": 1,
                    "maxLength": 11
                  }
              },
              {
                  "name": "Código Inmueble:",
                  "value": "",
                  "label": "hola",
                  "type": "number",
                  "validators": {
                    "required": true,
                    "minLength": 1,
                    "maxLength": 11
                  }
              },
              /* {
                  "name": "Tipo Inmueble:",
                  "value": "",
                  "type": "select",
                  "validators": {
                    "required": true
                  },
                  "options":[
                      {
                          "value": "Apartamento",
                          "label": "Apartamento"
                      },
                      {
                          "value": "Bodega",
                          "label": "Bodega"
                      },
                      {
                          "value": "Local",
                          "label": "Local"
                      },
                      {
                          "value": "Casa Local",
                          "label": "Casa Local"
                      }
                  ]
              }, */
              /* {
                  "name": "Propiedad:",
                  "value": "",
                  "type": "select",
                  "validators": {
                    "required": true
                  },
                  "options":[
                      {
                          "value": "Comodato",
                          "label": "Comodato"
                      },
                      {
                          "value": "Propía",
                          "label": "Propía"
                      }
                  ]
              }, */
              {
                  "name": "Número Inmueble:",
                  "value": "",
                  "label": "hola",
                  "type": "text",
                  "validators": {
                    "required": true,
                    "minLength": 10
                  }
              },
              {
                  "name": "Ciudad:",
                  "value": "",
                  "label": "hola",
                  "type": "text",
                  "validators": {
                    "required": true,
                    "minLength": 4
                  }
              },
              {
                  "name": "Metros cuadrados:",
                  "value": "",
                  "label": "hola",
                  "type": "number",
                  "validators": {
                    "required": false,
                    //"numeric-type": "double"
                  }
              },
              {
                  "name": "Mezanine:",
                  "value": "",
                  "label": "hola",
                  "type": "number",
                  "validators": {
                    "required": false,
                    //"numeric-type": "double"
                  }
              },
              {
                  "name": "Total Metros Cuadrados - Mezanine:",
                  "value": "Calculo realizado en el back",
                  "label": "hola",
                  "type": "number",
                  "validators": {
                      //"not_editable": true
                  }                
              },
              {
                  "name": "Matricula Inmobiliaria:",
                  "value": "",
                  "label": "hola",
                  "type": "text",
                  "validators": {
                    "required": false
                  }
              },
              /* {
                  "name": "Archivo Matricula Inmobiliaria:",
                  "value": "",
                  "type": "file",
                  "validators": {
                    "required": false,
                    //"extenxion": ".pdf"
                  }
              }, */
              {
                  "name": "Escritura Publica:",
                  "value": "",
                  "label": "hola",
                  "type": "text",
                  "validators": {
                    "required": false
                  }
              },
              /* {
                  "name": "Archivo Escritura Publíca:",
                  "value": "",
                  "type": "file",
                  "validators": {
                    "required": false,
                    //"extenxion": ".pdf"
                  }
              }, */
              /* {
                  "name": "Fecha:",
                  "value": "",
                  "type": "date",
                  "validators": {
                    "required": false
                  }
              } */
              
  
  
          ]
      }
  ]
  }
}
