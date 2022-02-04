import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { finalize, take } from 'rxjs/operators';

import { Editor } from 'primeng/editor';

import { MessagingService } from '@cad-core/services';
import {
  noWhitespaceValidator,
} from '@cad-core/utils';
import { FormsService } from '@cad-core/services/forms.service';
import { CanComponentDeactivate } from '@cad-core/guards/can-deactivate-guard.service';
import { IProduct } from '@cad-private/shared/interfaces';
import { ProductEntityService } from '@cad-private/shared/services';
import { CreateProductService } from '../shared/services';

@Component({
  selector: 'cad-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit, CanComponentDeactivate {
  @ViewChild(Editor)
  editor: Editor;
  @ViewChild('firstImageInput', { static: false })
  FirstImageInput: ElementRef;
  @ViewChild('secondImageInput', { static: false })
  SecondImageInput: ElementRef;

  productId: string;
  dateProduct: Date;
  contentArea: string;
  form: FormGroup;
  bodyProduct: IProduct;

  historyVisibility: boolean = false;
  quitAllowed: boolean = false;
  isSubmitting: boolean = false;
  uploadedFiles: any[] = [];

  maxDate: Date;
  firstImagePath: string;
  secondImagePath: string;
  firstImagePreviewForm: FormGroup;
  secondImagePreviewForm: FormGroup;
  tags: string[];
  keywords: string;

  constructor(
    @Inject(DOCUMENT) document,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _msgService: MessagingService,
    private _createProductService: CreateProductService,
    private _productsService: ProductEntityService,
    private _formsService: FormsService,
    public fb: FormBuilder
  ) {
    this.productId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // form contorls
    const formControls = {
      barcode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), noWhitespaceValidator()])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200)])),
      rate: new FormControl('', Validators.compose([Validators.required])),
    };

    this.form = this._fb.group(formControls);

    // update mode
    if (this.productId) {
      this._productsService.getByKey(this.productId).subscribe(data => {
        this.form.controls.name.setValue(data.name);
        this.form.controls.description.setValue(data.description);
        this.form.controls.barcode.setValue(data.barcode);
        this.form.controls.rate.setValue(data.rate);
      });
    }


  }

  onBlur(controlName: string) {
    this.form.get(controlName)?.markAsDirty();
  }

  onUpload(event) {
    this.uploadedFiles.concat(event.files);
  }

  async canDeactivate() {
    if (!this.quitAllowed) {
      return this._formsService.performDeactivateValidation(this.form).then((userConfirmed: boolean) => {
        if (userConfirmed) {
          this._createProductService.clearService();
        }
        return userConfirmed;
      });
    }
    return true;
  }

  prepareProductForEdit(): void {
    this._createProductService.element = {
      id: this.productId,
      ...this.form.value,
    };
    this.quitAllowed = true;
  }

  bindProductToService() {
    let secondImageValue: string;

    const {
      barcode,
      name,
      description,
      rate
    } = this.form.value;

    this.bodyProduct = {
      barcode: this.form.controls.barcode.value,
      description: this.form.controls.description.value,
      productCategory: this.form.controls.name.value,
      name: this.form.controls.name.value,
      rate: this.form.controls.rate.value,
    };

    this.isSubmitting = true;
    this.quitAllowed = true;
    if (this.productId) {
      this.prepareProductForEdit();
      this._productsService
        .update({
          ...this._createProductService.element,
          ...this.bodyProduct,
        })
        .pipe(
          take(1),
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this._msgService.success('PRODUCT.TOAST.UPDATE_SUCCESS.MESSAGE', 'PRODUCT.TOAST.UPDATE_SUCCESS.TITLE');
            this._router.navigate(['private', 'products']);
            this._createProductService.clearService();
          },
          () => {
            this._msgService.error('PRODUCT.TOAST.ERROR.MESSAGE', 'PRODUCT.TOAST.ERROR.TITLE');
          }
        );
    } else {
      this._productsService
        .add(this.bodyProduct)
        .pipe(
          take(1),
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this._msgService.success('PRODUCT.TOAST.CREATE_SUCCESS.MESSAGE', 'PRODUCT.TOAST.CREATE_SUCCESS.TITLE');
            this._router.navigate(['private', 'products']);
            this._createProductService.clearService();
          },
          () => {
            this._msgService.error('PRODUCT.TOAST.ERROR.MESSAGE', 'PRODUCT.TOAST.ERROR.TITLE');
          }
        );
    }
  }

  onSave(): void {
    let invalidFields: string[] = [];
    let invalidFieldName: string;

   
    if (this.form.valid) {
      this.bindProductToService();
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        if (control.invalid) invalidFields.push(field);
      });

      if (this.productId) {
        this._msgService.error(
          'PRODUCTS.TOAST.INVALID_EDIT_PRODUCT_FORM.MESSAGE',
          'PRODUCTS.TOAST.INVALID_EDIT_PRODUCT_FORM.TITLE',
          undefined,
          invalidFieldName
        );
      } else {
        this._msgService.error(
          'PRODUCTS.TOAST.INVALID_EDIT_PRODUCT_FORM.MESSAGE',
          'PRODUCTS.TOAST.INVALID_NEW_PRODUCT_FORM.TITLE',
          undefined,
          invalidFieldName
        );
      }
    }
  }
}
