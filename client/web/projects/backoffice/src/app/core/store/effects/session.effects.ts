import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MessagingService, AuthService, JwtService } from '../../services';
import { SESSION_ACTION_TYPES, SessionActions, LoginSuccess, LoginError } from '../actions/session.actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions<SessionActions>,
    private authService: AuthService,
    private _msgService: MessagingService,
    private _router: Router,
    private _jwtService: JwtService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SESSION_ACTION_TYPES.Login),
      map(action => action.payload),
      switchMap(credentials => {
        return this.authService.login(credentials.email, credentials.password).pipe(
          map(data => {
            return new LoginSuccess({
              accessToken: data.data.jwToken,
              innerAccessTokenMessage: null,
              refreshToken: null,
            });
          }),
          catchError((error: unknown) => {
            return of(new LoginError({ error }));
          })
        );
      })
    );
  });

  loginError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SESSION_ACTION_TYPES.LoginError),
        tap(() => {
          this._msgService.error('LOGIN.TOAST.ERROR.MESSAGE', 'LOGIN.TOAST.ERROR.TITLE');
        })
      );
    },
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SESSION_ACTION_TYPES.LoginSuccess),
        tap(loginSuccess => {
          this._jwtService.saveToken(loginSuccess.payload.accessToken);
          this._router.navigate(['private']);
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SESSION_ACTION_TYPES.Logout),
        tap(() => {
          this._jwtService.destroyToken();
          this._router.navigate(['public']);
        })
      );
    },
    { dispatch: false }
  );
}
