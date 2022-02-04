import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { ISessionState } from '../store/reducers/session.reducer';
import { selectSessionState } from '../store/selectors/session.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<ISessionState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectSessionState).pipe(
      map(authState => authState.isAuthenticated || !!localStorage.getItem('accessToken')),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['public']);
        }
      })
    );
  }
}
