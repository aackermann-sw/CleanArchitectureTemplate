import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { PRODUCT_ENTITY_NAME } from '@cad-private/shared/store';

import { IProduct } from '../../interfaces';

@Injectable()
export class ProductEntityService extends EntityCollectionServiceBase<IProduct> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(PRODUCT_ENTITY_NAME, serviceElementsFactory);
  }
}
