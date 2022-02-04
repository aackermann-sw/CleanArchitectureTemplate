import { IDataField } from './data-field.interface';

export interface IElement {
  id?: number;
  name: string;
  iconId: string;
  type: string;
  dataFields?: IDataField[];
}
