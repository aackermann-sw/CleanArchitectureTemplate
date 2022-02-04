import { DataFieldTypeEnum } from '../enums';

export interface IDataField {
  id?: number;
  typeName: DataFieldTypeEnum;
  name: string;
}
