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
}
