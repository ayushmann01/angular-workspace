import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private url: string = "https://v2.jokeapi.dev/joke/Programming?type=twopart&amount=10";

  constructor(private http: HttpClient) { }

  getJokes() {
      return this.http.get(this.url);
  }

}
