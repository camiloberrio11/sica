import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Construction } from '../models/Construction';
import { environment } from 'src/environments/environment';
import { ToolResponseService } from '../models/Tool';
import { UserResponseService } from '../models/User';
import { BodyCreateLoan, BodyUpdateLoan } from '../models/Loan';
import { ConstructionService } from './construction.service';

@Injectable({
  providedIn: 'root',
})
export class SicaApiService {
  constructor(
    private http: HttpClient,
    private constructionService: ConstructionService
  ) {}

  getConstruiction(): Observable<Construction[]> {
    return this.http.get<Construction[]>(
      `${environment.urlApi}/api/construction`
    );
  }

  getToolByCodeBar(code: string): Observable<ToolResponseService> {
    const idConstruction = this.constructionService.getSelectConstruction?.id;
    return this.http.get<ToolResponseService>(
      `${environment.urlApi}/api/${idConstruction}/tool/${code}`
    );
  }

  getUserByToken(token: string): Observable<UserResponseService> {
    return this.http.get<UserResponseService>(
      `${environment.urlApi}/api/user/${token}`
    );
  }

  createLoan(body: BodyCreateLoan): Observable<{ id: string }> {
    const idConstruction = this.constructionService.getSelectConstruction?.id;
    return this.http.post<{ id: string }>(
      `${environment.urlApi}/api/${idConstruction}/tool/loan`,
      body
    );
  }

  returnLoan(
    body: BodyUpdateLoan,
    idLoan: string,
    idConstruction: string
  ): Observable<any> {
    return this.http.patch(
      `${environment.urlApi}/api/${idConstruction}/tool/loan/${idLoan}/return-tool`,
      body
    );
  }
}
