import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstructionService } from '../models/Construction';
import { environment } from 'src/environments/environment';
import { ToolResponseService } from '../models/Tool';
import { UserResponseService } from '../models/User';
import { BodyCreateLoan } from '../models/Loan';

@Injectable({
  providedIn: 'root',
})
export class SicaApiService {
  constructor(private http: HttpClient) {}

  getConstruiction(): Observable<ConstructionService[]> {
    return this.http.get<ConstructionService[]>(
      `${environment.urlApi}/api/construction`
    );
  }

  getToolByCodeBar(code: string): Observable<ToolResponseService> {
    return this.http.get<ToolResponseService>(
      `${environment.urlApi}/api/6151e8904cfcd6faa44d846f/tool/${code}`
    );
  }

  getUserByToken(token: string): Observable<UserResponseService> {
    return this.http.get<UserResponseService>(
      `${environment.urlApi}/api/user/${token}`
    );
  }

  createLoan(body: BodyCreateLoan): Observable<any> {
    return this.http.post(
      `${environment.urlApi}/api/6151e8904cfcd6faa44d846f
/tool/loan`,
      body
    );
  }
}
