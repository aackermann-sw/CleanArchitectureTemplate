import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogModel } from '../model/dialog.model';

@Component({
  selector: 'cad-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  public header: string;
  public data: DialogModel;

  constructor(private _ref: DynamicDialogRef, private _config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.header = this._config.header;
    this.data = this._config.data;
  }

  close(confirm: boolean) {
    this._ref.close(confirm);
  }
}
