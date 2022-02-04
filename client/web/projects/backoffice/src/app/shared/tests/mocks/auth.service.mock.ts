import { LoginPayload, LoginSuccessPayload, LogoutSuccessPayload } from '@cad-core/models/auth.model';
import { of } from 'rxjs';

export const loginSuccessPayloadMock: LoginSuccessPayload = {
  accessToken: 'token',
  innerAccessTokenMessage: 'inner message',
  refreshToken: 'refreshToken',
};

export const loginPayloadMock: LoginPayload = {
  email: 'test@test.com',
  password: 'password',
};

export const loginErrorPayloadMock: LogoutSuccessPayload = {
  error: 'Error Message',
};

export class AuthServiceMock {
  login() {
    return of({
      element: {
        ...loginSuccessPayloadMock,
      },
    });
  }
}
