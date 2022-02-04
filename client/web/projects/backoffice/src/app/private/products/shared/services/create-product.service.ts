import { IDataField, IElement } from '@cad-private/shared/interfaces';

export class CreateProductService {
  private _element: IElement;

  get dataFields() {
    return this._element?.dataFields || [];
  }

  set dataFields(dataFields: IDataField[]) {
    this._element.dataFields = dataFields;
  }

  get element() {
    return this._element;
  }

  set element(element: IElement) {
    this._element = element;
  }

  clearService() {
    this._element = undefined;
  }
}
