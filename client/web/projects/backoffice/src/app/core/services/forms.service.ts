import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private _msgService: MessagingService) {}

  performDeactivateValidation(form: FormGroup, quitAllowed?: boolean): Promise<boolean> {
    if (!form || form.untouched || form.pristine || quitAllowed) {
      return new Promise<boolean>(resolve => {
        resolve(true);
      });
    }

    if (form.dirty) {
      return this._msgService.showPreventLeaveDialog();
    }

    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }
}
