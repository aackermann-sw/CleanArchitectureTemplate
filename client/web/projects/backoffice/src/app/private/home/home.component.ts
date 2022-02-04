import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'cad-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _router: Router) {}

}
