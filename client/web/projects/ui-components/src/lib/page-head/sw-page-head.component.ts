import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { IconEnum } from '../enums/icon.enum';

@Component({
  selector: 'sw-page-head',
  templateUrl: './sw-page-head.component.html',
  styleUrls: ['./sw-page-head.component.scss'],
})
export class SwPageHeadComponent implements OnInit {

  editIconDialogVisibility: boolean = false;

  @Input() fixed = false;

  @Input() icon = '';
  
  @Input() editIconLabel = '';
  
  @Input() editIconModalTitle: '';
  
  @Input() editIconModalCancelText: '';
  
  @Input() editIconModalConfirmText: '';
  
  @Input() title = '';
  
  @Input() subtitle = '';
  
  @Input() subtitleIcon = '';
  
  @Input() inputLabel = '';
  
  @Input() inputFormControl: FormControl;
  
  @Input() iconFormControl : FormControl;

  @Input() inputRequiredErrorText = '';

  @Input() inputFormatErrorText = '';

  iconList = Object.keys(IconEnum).map(key => IconEnum[key as any]);
  dialogForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dialogForm = this._fb.group({
      iconDialog: [{ value: this.iconFormControl?.value }]
    });
  }

  showHideEditIconDialog(): void {
    this.editIconDialogVisibility = !this.editIconDialogVisibility;
    if (this.editIconDialogVisibility) {
      this.dialogForm.controls.iconDialog.setValue(this.iconFormControl.value);
    }
  }

  confirmIcon(): void {
    this.iconFormControl.setValue(this.dialogForm.controls.iconDialog.value);
    this.showHideEditIconDialog();
  }

  onInputBlur(): void {
    this.inputFormControl.markAsDirty();
  }
}
