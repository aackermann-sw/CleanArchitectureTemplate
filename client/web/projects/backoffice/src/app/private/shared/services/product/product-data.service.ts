import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { ConfigService } from '@cad-core/services';
import { PRODUCT_ENTITY_NAME } from '@cad-private/shared/store';

import { IProduct, IResponse } from '../../interfaces';

@Injectable()
export class ProductDataService extends DefaultDataService<IProduct> {
  private _productsUrl: string;

  constructor(private _http: HttpClient, private _httpUrlGenerator: HttpUrlGenerator, private _configService: ConfigService) {
    super(PRODUCT_ENTITY_NAME, _http, _httpUrlGenerator);
    this._productsUrl = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Product`;
  }

  getAll(): Observable<IProduct[]> {
    return this._http.get<any>(this._productsUrl).pipe(map(response => response.items));
  }

  getWithQuery(queryParams: string | QueryParams): Observable<IProduct[]> {
    return this._http.get<any>(this._productsUrl, { params: queryParams as any }).pipe(map(response => response.items));
  }

  add(body: IProduct): Observable<IProduct> {
    let fd: any = new FormData();
    fd.append('Name', body.name);
    fd.append('Description', body.description);
    fd.append('Barcode', body.barcode);
    fd.append('Rate', body.rate);
    fd.append('Image', null);
    fd.append('ProductCategoryId', 1);

    return this._http.post<IProduct>(`${this._productsUrl}/Create`, fd);
  }

  getById(key: string | number): Observable<IProduct> {
    return this._http.get<IResponse>(`${this._productsUrl}/${key}`).pipe(map(response => response.data));
  }

  update(update: Update<IProduct>): Observable<IProduct> {
    let fd: any = new FormData();
    fd.append('Id', update.changes.id);
    fd.append('Name', update.changes.name);
    fd.append('Description', update.changes.description);
    fd.append('Image', null);
    fd.append('Barcode', update.changes.barcode);
    fd.append('Rate', update.changes.rate);
    fd.append('ProductCategoryId', 1);

    return this._http.put<IProduct>(`${this._productsUrl}/Update`, fd);
  }

  delete(id: string): Observable<any> {
    return this._http.delete(`${this._productsUrl}/${id}`);
  }
}
