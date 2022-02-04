import { Action } from '@ngrx/store';
import { IDataField } from '@cad-private/shared/interfaces';

export enum ELEMENT_ACTION_TYPES {
  SaveElementDataFields = '[Element Editor] Save Element Data Fields',
}

export class SaveElementDataFields implements Action {
  readonly type = ELEMENT_ACTION_TYPES.SaveElementDataFields;

  constructor(public payload: IDataField[]) {}
}

export type ElementAction = SaveElementDataFields;
