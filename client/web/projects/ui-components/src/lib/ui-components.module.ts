import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from './primeng.module';
import { SwButtonComponent } from './button/sw-button.component';
import { SwPageHeadComponent } from './page-head/sw-page-head.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [SwButtonComponent, SwPageHeadComponent, ConfirmationDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PrimengModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SwButtonComponent,
    SwPageHeadComponent,
    ConfirmationDialogComponent,
  ],
})
export class UiComponentsModule {}
