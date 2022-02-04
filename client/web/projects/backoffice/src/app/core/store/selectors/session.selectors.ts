import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSession from '../reducers/session.reducer';

export const selectSessionState = createFeatureSelector<fromSession.ISessionState>(fromSession.sessionFeatureKey);

export const selectAuthenticating = createSelector(selectSessionState, sessionState => sessionState.isAuthenticating);
