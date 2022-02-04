import { GenericAction } from '@cad-shared/utils/generic.action';
import { SESSION_ACTION_TYPES } from '../actions/session.actions';

export const sessionFeatureKey = 'session';

export interface ISessionState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  errorMessage: string;
  innerAccessTokenMessage: string;
  refreshToken: string;
}

export const initialState: ISessionState = {
  isAuthenticating: false,
  isAuthenticated: false,
  accessToken: '',
  errorMessage: '',
  innerAccessTokenMessage: '',
  refreshToken: '',
};

export default function sessionReducer(
  state: ISessionState = initialState,
  action: GenericAction<SESSION_ACTION_TYPES, any>
): ISessionState {
  switch (action.type) {
    case SESSION_ACTION_TYPES.Login:
      return {
        ...state,
        isAuthenticating: true,
      };

    case SESSION_ACTION_TYPES.LoginSuccess:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        innerAccessTokenMessage: action.payload.innerAccessTokenMessage,
        refreshToken: action.payload.refreshToken,
      };

    case SESSION_ACTION_TYPES.LoginError:
      return {
        ...state,
        isAuthenticating: false,
      };

    case SESSION_ACTION_TYPES.Logout:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: '',
        innerAccessTokenMessage: '',
        refreshToken: '',
      };

    default:
      return state;
  }
}
