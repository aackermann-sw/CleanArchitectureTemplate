export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginSuccessPayload {
  accessToken: string;
  innerAccessTokenMessage: string;
  refreshToken: string;
}

export interface LogoutSuccessPayload {
  error: any;
}
