import { GenericAction } from '@cad-shared/utils/generic.action';
import { loginSuccessPayloadMock } from '@cad-shared/tests/mocks';

import { SESSION_ACTION_TYPES } from '../actions/session.actions';
import sessionReducer, { initialState } from './session.reducer';
import { LoginSuccessPayload, LogoutSuccessPayload } from '../../models/auth.model';

describe('Session Reducer', () => {
  it('Should initialize', () => {
    const noopAction = new GenericAction('noop' as SESSION_ACTION_TYPES);
    const newState = sessionReducer(undefined, noopAction);

    expect(newState).toEqual(initialState);
  });

  it('Should login user', () => {
    const payload: LoginSuccessPayload = {
      ...loginSuccessPayloadMock,
    };

    const loginAction = new GenericAction(SESSION_ACTION_TYPES.LoginSuccess, payload);

    const resultState = sessionReducer(initialState, loginAction);
    expect(resultState).toEqual({
      ...initialState,
      isAuthenticated: true,
      accessToken: payload.accessToken,
      innerAccessTokenMessage: payload.innerAccessTokenMessage,
      refreshToken: payload.refreshToken,
    });
  });

  it('Should logout user', () => {
    const payload: LogoutSuccessPayload = { error: 'test' };

    const logoutAction = new GenericAction(SESSION_ACTION_TYPES.Logout, payload);

    const resultState = sessionReducer(initialState, logoutAction);
    expect(resultState).toEqual({
      ...initialState,
    });
  });
});
