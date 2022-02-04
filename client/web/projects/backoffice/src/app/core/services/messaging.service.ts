import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { ConfirmationDialogComponent, DialogModel } from '@sw-ui-components';

const defaultDuration = 6000;

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(
    private _messageService: MessageService,
    private _translate: TranslateService,
    private _dialogService: DialogService
  ) {}

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  getAsyncTranslation(transKey: string | string[], interpolateParams?: object): Observable<any> {
    return this._translate.get(transKey, interpolateParams);
  }

  info(message: string, title = 'GENERAL.TITLES.INFO', duration = defaultDuration): void {
    this._messageService.add({
      severity: 'info',
      summary: this.getTranslation(title),
      detail: this.getTranslation(message),
      key: 'globalInfoNotification',
      life: duration,
    });
  }

  success(message: string, title = 'GENERAL.TITLES.SUCCESS', duration = defaultDuration): void {
    this._messageService.add({
      severity: 'success',
      summary: this.getTranslation(title),
      detail: this.getTranslation(message),
      key: 'globalSuccessNotification',
      life: duration,
    });
  }

  warning(message: string, title = 'GENERAL.TITLES.WARNING', duration = defaultDuration): void {
    this._messageService.add({
      severity: 'warn',
      summary: this.getTranslation(title),
      detail: this.getTranslation(message),
      key: 'globalWarningNotification',
      life: duration,
    });
  }

  error(message: string, title = 'GENERAL.TITLES.ERROR', duration = defaultDuration, field? : string): void{
    this._messageService.add({
      severity: 'error',
      summary:  this.getTranslation(title),
      detail: this.getTranslation(message, {field}),
      key: 'globalErrorNotification',
      life: duration,
    });
  }

  showPreventLeaveDialog(): Promise<boolean> {
    const ref = this._dialogService.open(ConfirmationDialogComponent, {
      header: this.getTranslation('GENERAL.QUIT.HEADER'),
      data: new DialogModel(
        this.getTranslation('GENERAL.CANCEL'),
        this.getTranslation('GENERAL.QUIT.CONFIRM'),
        this.getTranslation('GENERAL.QUIT.MESSAGE')
      ),
    });

    return new Promise<boolean>(resolve => {
      ref.onClose.subscribe((confirm: boolean) => {
        resolve(confirm);
      });
    });
  }
}
