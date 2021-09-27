import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstructionService } from '../models/Construction';

@Injectable({
  providedIn: 'root',
})
export class SicaApiService {
  constructor(private http: HttpClient) {}

  getConstruiction(): Observable<ConstructionService[]> {
    return this.http.get<ConstructionService[]>(
      'https://sica-backend.herokuapp.com/api/construction'
    );
  }
}
