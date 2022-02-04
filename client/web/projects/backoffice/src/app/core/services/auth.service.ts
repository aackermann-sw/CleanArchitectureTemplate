import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUrl: string | undefined;

  constructor(private _http: HttpClient, private _configService: ConfigService) {}

  // Private method to initially load api Url
  private _setApiUrl(): void {
    if (!this._authUrl) {
      this._authUrl = `${this._configService.appConfig.apiIdentityUrl}`;
    }
  }

  login(email: string, password: string): Observable<any> {
    this._setApiUrl();
    return this._http.post(`${this._authUrl}api/Account/authenticate`, { email, password }).pipe(map(response => response));
  }
}
