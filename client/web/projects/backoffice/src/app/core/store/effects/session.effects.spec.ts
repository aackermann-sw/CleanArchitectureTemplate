import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  AuthServiceMock,
  loginErrorPayloadMock,
  loginPayloadMock,
  loginSuccessPayloadMock,
  messagingServiceMock,
} from '@cad-shared/tests/mocks';

import { MessagingService, AuthService, JwtService } from '../../services';
import { Login, LoginError, LoginSuccess} from '../actions/session.actions';
import { SessionEffects } from './session.effects';

describe('Session Effects', () => {
  let actions$: Observable<any>;
  let effects: SessionEffects;
  let routerSpy: Router;
  let authService: AuthService;
  let messagingService: MessagingService;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        SessionEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: MessagingService, useValue: messagingServiceMock },
        { provide: Router, useValue: routerSpy },
        { provide: JwtService, useValue: { saveToken: (_) => {}, destroyToken: () => {} }}
      ],
    });

    effects = TestBed.inject(SessionEffects);
    authService = TestBed.inject(AuthService);
    messagingService = TestBed.inject(MessagingService);
  });

  it('Starts Login process', done => {
    const spy = spyOn(authService, 'login').and.callThrough();

    // create an actions stream and immediately dispatch a GET action
    const loginAction = new Login(loginPayloadMock);
    actions$ = of(loginAction);

    effects.login$.subscribe(res => {
      const effectResponse = new LoginSuccess(loginSuccessPayloadMock);
      expect(res).toEqual(effectResponse);
    });
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it('Login Error Effect its called', done => {
    const spy = spyOn(messagingService, 'error');
    // create an actions stream and immediately dispatch a GET action
    const loginErrorAction = new LoginError(loginErrorPayloadMock);
    actions$ = of(loginErrorAction);

    effects.loginError$.subscribe(() => {
      expect(spy).toHaveBeenCalledWith('LOGIN.TOAST.ERROR.MESSAGE', 'LOGIN.TOAST.ERROR.TITLE');
    });
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it('Ends the login process', done => {
    const loginSuccessAction = new LoginSuccess(loginSuccessPayloadMock);
    actions$ = of(loginSuccessAction);

    effects.loginSuccess$.subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['private']);
      done();
    });
  });
});
