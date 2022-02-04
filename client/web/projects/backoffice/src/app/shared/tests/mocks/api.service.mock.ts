import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class ApiServiceMock {
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return of();
  }

  put(path: string, body: Object = {}): Observable<any> {
    return of();
  }

  post(path: string, body: Object = {}, identity: boolean): Observable<any> {
    return of();
  }

  delete(path): Observable<any> {
    return of();
  }
}
