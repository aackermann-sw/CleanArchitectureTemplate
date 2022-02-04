import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ISessionState, Logout } from '@cad-core/store';
import { JwtService, MessagingService } from '../services';


interface Error {
  message: string;
  errors: []
}

const LOGIN_PATH = 'sessions';
const TIMEOUT_TO_GROUP_MESSAGES = 3000;
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  showFirst: boolean = false;

  constructor(private jwtService: JwtService, private _store: Store<ISessionState>, private _messagingService: MessagingService) {}

  private _handleError401(error: HttpErrorResponse): Observable<any> {
    this.showFirst = true;
    setTimeout(() => {
      this.showFirst = false;
    }, TIMEOUT_TO_GROUP_MESSAGES);
    this._store.dispatch(new Logout());
    this._messagingService.info('LOGIN.TOAST.SESSION_EXPIRED.MESSAGE', 'LOGIN.TOAST.SESSION_EXPIRED.TITLE');
    return throwError(error);
  }

  private _handleError400(error: HttpErrorResponse): Observable<any> {
    let customError = error.error as Error;
    let messages = [];
    var propNames = Object.getOwnPropertyNames(customError.errors);
    propNames.forEach(
        function(propName) {
            customError.errors[propName].forEach(element => {
              messages.push(element);
            });
        }
    );

    messages.forEach(element => {
      this._messagingService.error(element, "Validation");  
    });
   
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes(LOGIN_PATH)) {
      return next.handle(req);
    }

    const token = this.jwtService.getToken();
    const headersConfig = {
      Authorization: `Bearer ${token}`,
    };
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 0 && !this.showFirst) {
          return this._handleError401(error);
        }else if (error.status === 400) {
          return this._handleError400(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
