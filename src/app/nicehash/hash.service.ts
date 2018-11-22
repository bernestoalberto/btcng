import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import config from '../../assets/config.js';

const httpoptions = {
  headers: new HttpHeaders({'Content-Type': 'application /json' })
};


@Injectable({
  providedIn: 'root'
})
export class HashService {
  constructor(private http: HttpClient) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getApiVersion(): Observable <any> {
    return this.http.get(config.result, httpoptions).pipe(
      tap(_ => console.log(config.result)),
      catchError(this.handleError('getApiVersion', []))
    );
  }
}
