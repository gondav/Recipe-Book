import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private baseURL = environment.baseURL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getItems<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseURL}/${endpoint}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItemByParam<T>(endpoint: string, param: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.baseURL}/${endpoint}/${param}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createItem<T>(endpoint: string, item: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseURL}/${endpoint}`, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem<T>(endpoint: string, id: number, item: T): Observable<T> {
    return this.http
      .put<T>(`${this.baseURL}/${endpoint}/${id}`, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem<T>(endpoint: string, id: number): Observable<T> {
    return this.http
      .delete<T>(`${this.baseURL}/${endpoint}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMsg =
      error.error instanceof ErrorEvent
        ? error.error.message
        : { status: error.status, message: error.error };

    return throwError(() => errorMsg);
  }
}
