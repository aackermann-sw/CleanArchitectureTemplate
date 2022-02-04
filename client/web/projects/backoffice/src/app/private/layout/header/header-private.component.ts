import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ISessionState, Logout } from '@cad-core/store';

import { OverlayPanel } from 'primeng/overlaypanel';
import { JwtService } from '@cad-core/services';

@Component({
  selector: 'cad-header-private',
  templateUrl: './header-private.component.html',
  styleUrls: ['./header-private.component.scss'],
})
export class HeaderPrivateComponent {
  @ViewChild('headerProfileDropdown') profileDropdown: OverlayPanel;
  @ViewChild('headerMobileMenuDropdown') menuDropdown: OverlayPanel;

  userEmail: string;

  constructor(private _store: Store<ISessionState>, private _router: Router, private _jwtService: JwtService) {
    this.userEmail = _jwtService.getEmail();
  }

  logout(): void {
    this.profileDropdown.hide();
    this._store.dispatch(new Logout());
  }

  goToPage(path: string): void {
    this.menuDropdown.hide();
    this._router.navigateByUrl(path);
  }
}
