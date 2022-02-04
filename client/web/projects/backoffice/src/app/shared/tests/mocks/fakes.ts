import { DataFieldTypeEnum } from "@cad-private/shared/enums";
import { ICollection, IElement } from "@cad-private/shared/interfaces";

export const fakeCollection: ICollection = {
  id: 1,
  name: 'Fake Collection',
  iconName: 'mdi-cube',
  elementsIds: [1],
};

export const fakeElement: IElement = {
  id: 1,
  type: 'WORKFLOW',
  name: 'Fake Element',
  iconId: 'mdi-cube',
  dataFields: [{ id: 1, name: 'Some Text Field', typeName: DataFieldTypeEnum.TEXT }],
};
