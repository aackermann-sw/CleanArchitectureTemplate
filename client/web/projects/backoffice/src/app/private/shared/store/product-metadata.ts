import { EntityMetadataMap } from '@ngrx/data';

interface IEntity {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PRODUCT_ENTITY_NAME = 'Product';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PRODUCT_INSTANCE_ENTITY_NAME = 'Product Instance';

export const entityMetadata: EntityMetadataMap = {};

entityMetadata[`${PRODUCT_ENTITY_NAME}`] = {
  sortComparer: compareById,
  entityDispatcherOptions: {
    optimisticDelete: true,
  },
};

entityMetadata[`${PRODUCT_INSTANCE_ENTITY_NAME}`] = {
  entityDispatcherOptions: {
    optimisticDelete: true,
  },
};

export const pluralNames = {};
pluralNames[`${PRODUCT_ENTITY_NAME}`] = 'Products';

function compareById(a: IEntity, b: IEntity): number {
  return b.id - a.id;
}
