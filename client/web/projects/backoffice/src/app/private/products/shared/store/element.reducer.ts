import { IDataField } from '@cad-private/shared/interfaces';
import { ElementAction, ELEMENT_ACTION_TYPES } from './element.actions';

export const elementFeatureKey = 'element';

export interface IElementState {
  elementDataFields: IDataField[];
}

export const initialState: IElementState = {
  elementDataFields: [],
};

export default function elementReducer(state: IElementState = initialState, action: ElementAction): IElementState {
  switch (action.type) {
    case ELEMENT_ACTION_TYPES.SaveElementDataFields:
      return {
        ...state,
        elementDataFields: action.payload,
      };

    default:
      return state;
  }
}
