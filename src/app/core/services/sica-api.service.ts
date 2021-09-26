import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SicaApiService {


    constructor(private http: HttpClient) { }


    getConstruiction(): Observable<any> {
      return this.http.get('');
    }
}
