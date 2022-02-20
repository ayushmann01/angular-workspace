import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  url: string ="https://api.publicapis.org/entries";

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get(this.url);
  }
}
