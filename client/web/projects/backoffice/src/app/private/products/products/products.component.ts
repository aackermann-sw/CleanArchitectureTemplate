import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DialogService } from 'primeng/dynamicdialog';

import { ConfirmationDialogComponent, DialogModel } from '@sw-ui-components';
import { MessagingService } from '@cad-core/services';
import { IProduct } from '@cad-private/shared/interfaces';
import { ProductEntityService } from '@cad-private/shared/services';

@Component({
  selector: 'cad-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private PAGE_SIZE_DEFAULT: string = '100';
  private PAGE_NUMBER_DEFAULT: string = '1';
  
  @ViewChild('rowActionsDropdown') op!: OverlayPanel;

  filterTitleControl = new FormControl('');
  
  tableLoading$: Observable<boolean>;
  products$: Observable<IProduct[]>;

  _filtersCombined$: Observable<[string]>;

  defaultIcon = 'mdi-cube';
  deleteIcon = 'mdi-trash-can';
  elementSelected: IProduct;

  private _productsTitleFilter$: Observable<string>;

  private _destroyed$ = new Subject<void>();
  loading: boolean;

  constructor(
    private _router: Router,
    private _productEntityService: ProductEntityService,
    private _msgService: MessagingService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._productsTitleFilter$ = this.filterTitleControl.valueChanges.pipe(startWith(''), debounceTime(500));
    this._filtersCombined$ = combineLatest([this._productsTitleFilter$]);

    this._filtersCombined$.subscribe(([titleFilter]: [string]) => {
      let queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
      if (titleFilter && titleFilter !== '') {
        queryParams = Object.assign(queryParams, { filterByTitle: titleFilter });
      }
      this._productEntityService.getWithQuery(queryParams);
    });

    this.products$ = this._filtersCombined$.pipe(
      switchMap(([titleFilter]: [string]) => {
        return this._filteredEntities(titleFilter);
      })
    );

    this.tableLoading$ = this._productEntityService.loading$;
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  goToCreateElement(): void {
    this._router.navigate(['private', 'products', 'create']);
  }

  goToEditElement(): void {
    if (this.elementSelected) {
      this._router.navigate(['private', 'products', 'edit', this.elementSelected.id]);
    }
  }

  showElementOptions(event, elementSelected: IProduct): void {
    this.elementSelected = elementSelected;
    this.op.toggle(event);
  }

  private deleteElement() {
    this._productEntityService
      .delete(this.elementSelected.id)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: () => this._msgService.success('PRODUCT.TOAST.DELETE_SUCCESS.MESSAGE', 'PRODUCT.TOAST.DELETE_SUCCESS.TITLE'),
        error: () => this._msgService.error('PRODUCT.TOAST.DELETE_ERROR.MESSAGE', 'PRODUCT.TOAST.DELETE_ERROR.TITLE'),
      });
  }

  private _matchesPattern(product: IProduct, description: string): boolean {
    if(product.description == undefined)
      return true;

    const descriptionP = product.description.toLowerCase();
    const descriptionI = description.toLowerCase();
    return descriptionP.includes(descriptionI);
  }

  private _matchesName(product: IProduct, name: string): boolean {
    const nameP = product.name.toLowerCase();
    const nameI = name.toLowerCase();
    return nameP.includes(nameI);
  }

  private _filteredEntities(filter: string): Observable<IProduct[]> {
    return this._productEntityService.entities$.pipe(
      map(products =>
        products.filter(product => this._matchesPattern(product, filter) || this._matchesName(product, filter))
      )
    );
  }

  showDeleteElementDialog() {
    this.op.hide();
    const ref = this._dialogService.open(ConfirmationDialogComponent, {
      header: this._msgService.getTranslation('PRODUCT.DELETE.TITLE'),
      data: new DialogModel(
        this._msgService.getTranslation('GENERAL.CANCEL'),
        this._msgService.getTranslation('GENERAL.DELETE'),
        this._msgService.getTranslation('PRODUCT.DELETE.MESSAGE'),
        this.deleteIcon
      ),
    });
    ref.onClose.subscribe((confirm: boolean) => {
      if (confirm) {
        this.deleteElement();
      }
    });
  }
}
