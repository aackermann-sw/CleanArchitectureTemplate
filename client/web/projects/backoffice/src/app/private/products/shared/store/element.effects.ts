import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagingService } from '@cad-core/services/messaging.service';

import { ElementAction } from './element.actions';

@Injectable()
export class ElementEffects {
  constructor(private actions$: Actions<ElementAction>, private _msgService: MessagingService) {}

  // TODO: Adjust to use ngrx-data error streams instead:

  elementsLoadingFailed$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType('-- Put here action type of entity error --'),
        tap(() => {
          this._msgService.error('PRODUCT.TOAST.LIST_LOADING_FAILED.MESSAGE', 'PRODUCT.TOAST.LIST_LOADING_FAILED.TITLE');
        })
      );
    },
    { dispatch: false }
  );
}
