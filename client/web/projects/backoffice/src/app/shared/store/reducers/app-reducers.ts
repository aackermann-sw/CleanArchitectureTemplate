import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
