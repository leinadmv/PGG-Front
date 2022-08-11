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
}
