import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cad-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private _router: Router) {}
  goToPage(path: string): void {
    this._router.navigateByUrl(path);
  }
}
