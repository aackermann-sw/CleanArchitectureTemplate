import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private _jwtService: JwtService) {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoggedIn()) {
      return component.canDeactivate();
    }
    return true;
  }

  isLoggedIn() {
    return this._jwtService.getToken() !== null;
  }
}
