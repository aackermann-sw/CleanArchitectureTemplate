import { NavigationExtras } from '@angular/router';

export class RouterMock {
  navigateByUrl(route: string) {}

  navigate(route: Array<string>, options?: NavigationExtras) {}
}
