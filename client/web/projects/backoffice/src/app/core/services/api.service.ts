import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiSuffixEnum } from '@cad-core/enums';

import { ConfigService } from './config.service';

@Injectable()
export class ApiService {
  private _apiGatewayUrl: string;

  constructor(private _http: HttpClient, private _configService: ConfigService) {
    this._apiGatewayUrl = _configService.appConfig.apiEntitiesUrl;
  }

  private static formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, apiSuffix: ApiSuffixEnum, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get(`${this._apiGatewayUrl}${apiSuffix}${path}`, { params }).pipe(catchError(ApiService.formatErrors));
  }

  put(path: string, apiSuffix: ApiSuffixEnum, body: Object = {}): Observable<any> {
    return this._http
      .put(`${this._apiGatewayUrl}${apiSuffix}${path}`, JSON.stringify(body))
      .pipe(catchError(ApiService.formatErrors));
  }

  post(path: string, apiSuffix: ApiSuffixEnum, body: Object = {}): Observable<any> {
    return this._http
      .post(`${this._apiGatewayUrl}${apiSuffix}${path}`, JSON.stringify(body))
      .pipe(catchError(ApiService.formatErrors));
  }

  delete(path: string, apiSuffix: ApiSuffixEnum): Observable<any> {
    return this._http.delete(`${this._apiGatewayUrl}${apiSuffix}${path}`).pipe(catchError(ApiService.formatErrors));
  }
}
