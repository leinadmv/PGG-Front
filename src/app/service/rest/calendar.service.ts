import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const PGG_URL = environment.backPgg;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor( private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  getNotification(date): Observable<any> {
    return this.http.post<any>(`${PGG_URL}notification/listByDates`, date)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveNotification(date): Observable<any> {
    return this.http.post<any>(`${PGG_URL}notification/create`, date)
      .pipe(
        catchError(this.handleError)
      );
  }
}
