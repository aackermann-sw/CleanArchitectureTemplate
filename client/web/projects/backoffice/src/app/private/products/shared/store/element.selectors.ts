import { createFeatureSelector, createSelector } from '@ngrx/store';
import { elementFeatureKey, IElementState } from './element.reducer';

export const elementStateSelector = createFeatureSelector<IElementState>(elementFeatureKey);

export const elementDataFieldsSelector = createSelector(elementStateSelector, elementState => elementState.elementDataFields);
