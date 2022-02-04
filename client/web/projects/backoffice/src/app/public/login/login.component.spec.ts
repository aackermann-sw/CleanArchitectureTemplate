import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';

import { UiComponentsModule } from '@sw-ui-components';
import { MessagingService } from '@cad-core/services';
import { ISessionState, Login, selectAuthenticating } from '@cad-core/store';
import { messagingServiceMock } from '@cad-shared/tests/mocks';
import { LoginComponent } from './login.component';

describe('Public Auth LoginComponent', () => {
  const initialState: ISessionState = {
    isAuthenticating: false,
    isAuthenticated: false,
    accessToken: null,
    errorMessage: null,
    innerAccessTokenMessage: null,
    refreshToken: null,
  };

  let mockIsAuthenticatingSelector;

  let component: LoginComponent;
  let form: FormGroup;
  let store: MockStore;
  let fixture: ComponentFixture<LoginComponent>;
  let emailInput;
  let passwordInput;
  let submitBtn;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [UiComponentsModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        provideMockStore({ initialState, selectors: [] }),
        { provide: MessagingService, useValue: messagingServiceMock },
        { provide: DialogService, useValue: {} },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockIsAuthenticatingSelector = store.overrideSelector(selectAuthenticating, false);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    form = component.authForm;

    emailInput = form.controls.email;
    passwordInput = form.controls.password;
    submitBtn = fixture.debugElement.nativeElement.querySelector('button[id="submitBtn"]');
  });

  describe('Upon initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Upon user interaction', () => {
    it('When logging in with valid data, it should log the user', () => {
      const spy = spyOn(store, 'dispatch');

      // Used only for coverage
      component.onBlur('email');

      const emailValue = 'test@test.com';
      const passwordValue = '123123';

      emailInput.setValue(emailValue);
      passwordInput.setValue(passwordValue);

      submitBtn.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(new Login({ email: emailValue, password: passwordValue }));
    });

    it('When logging in with invalid data, it should not allow to proceed', () => {
      const spy = spyOn(store, 'dispatch');

      const emailValue = 'test';
      const passwordValue = '123123';

      emailInput.setValue(emailValue);
      passwordInput.setValue(passwordValue);

      submitBtn.click();
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalledWith(new Login({ email: emailValue, password: passwordValue }));
    });
  });
});
