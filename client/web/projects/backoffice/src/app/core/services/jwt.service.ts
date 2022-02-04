import { Injectable } from '@angular/core';

import { ACCESS_TOKEN_KEY } from '../utils';

@Injectable()
export class JwtService {
  getToken(): String {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  saveToken(token: String) {
    localStorage.accessToken = token;
  }

  destroyToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  getEmail(): string {
    const token = this.getToken();
    const decodedJwt = JSON.parse(window.atob(token.split('.')[1]));
    return decodedJwt.email;
  }
}
