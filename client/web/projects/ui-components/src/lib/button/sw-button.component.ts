import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-button',
  template: `
    <button class="button">
      <i *ngIf="icon" class="mdi {{ icon }} buttonIcon_right"></i>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./sw-button.component.scss'],
})
export class SwButtonComponent {
  @Input() click: any;
  @Input() icon = '';
  @Input() color = '';
  @Input() size = '';
  @Input() clear = '';
  @Input() outline = false;
  @Input() shadow = false;
}
