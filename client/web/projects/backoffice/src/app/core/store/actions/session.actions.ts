import { Action } from '@ngrx/store';
import { LoginSuccessPayload, LogoutSuccessPayload } from '../../models/auth.model';

export enum SESSION_ACTION_TYPES {
  Login = '[Session] Login',
  LoginSuccess = '[Session] Login Success',
  LoginError = '[Session] Login Error',
  Logout = '[Session] Logout',
}

export class Login implements Action {
  readonly type = SESSION_ACTION_TYPES.Login;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = SESSION_ACTION_TYPES.LoginSuccess;

  constructor(public payload: LoginSuccessPayload) {}
}

export class LoginError implements Action {
  readonly type = SESSION_ACTION_TYPES.LoginError;

  constructor(public payload: LogoutSuccessPayload) {}
}

export class Logout implements Action {
  readonly type = SESSION_ACTION_TYPES.Logout;
}

export type SessionActions = Login | LoginSuccess | LoginError | Logout;
