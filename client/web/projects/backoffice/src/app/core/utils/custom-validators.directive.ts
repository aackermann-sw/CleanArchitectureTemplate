import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value ? !('' || control.value.replace(/(<([^>]+)>)/gi, '').trim().length === 0) : false;
    return isValid ? null : { required: true };
  };
}