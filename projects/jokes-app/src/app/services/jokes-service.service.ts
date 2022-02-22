import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private url: string = "https://v2.jokeapi.dev/joke/Programming?type=twopart&amount=10";

  constructor(private http: HttpClient) { }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //   errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log('error', errorMessage);
  //   return throwError(errorMessage);
  //   }

  getJokes() {
      return this.http.get(this.url);
  }



  // public checkOrderHistory(id: any, info: any) {
  //   return this.http
  //   .get(
  //   this.PROD_URL +
  //   `Orderhistory?action=get_history&order_id=${id}&productinfo=${info}`
  //   )
  //   .pipe(catchError(this.handleError));
  //   }

}
