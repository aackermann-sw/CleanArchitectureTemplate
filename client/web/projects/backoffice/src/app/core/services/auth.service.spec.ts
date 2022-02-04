import { of } from 'rxjs';

import { AuthService } from '@cad-core/services/auth.service';
import { configServiceMock, loginPayloadMock, loginSuccessPayloadMock } from '@cad-shared/tests/mocks';

describe('Auth Service', () => {
  let authService: AuthService;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(httpClientSpy as any, configServiceMock as any);
  });

  it('Should call login', () => {
    httpClientSpy.post.and.returnValue(of(loginSuccessPayloadMock));

    const { email, password } = loginPayloadMock;
    authService.login(email, password).subscribe(res => {
      expect(res).toBe(loginSuccessPayloadMock);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});
