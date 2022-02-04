import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { IProduct } from '@cad-private/shared/interfaces';
import { ProductEntityService } from '@cad-private/shared/services';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {
  constructor(private _elementService: ProductEntityService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const elementId = route.paramMap.get('id');
    return this._elementService.getByKey(elementId);
  }
}
