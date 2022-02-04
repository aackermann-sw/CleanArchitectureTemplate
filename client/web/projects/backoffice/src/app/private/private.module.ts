import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityDataService, EntityDefinitionService, PLURAL_NAMES_TOKEN } from '@ngrx/data';

import { UiComponentsModule } from '@sw-ui-components';

import { SharedModule } from '@cad-shared/shared.module';
import { PrivateRoutingModule } from '@cad-private/private-routing.module';

import { HomeComponent } from './home/home.component';
import { FooterPrivateComponent, HeaderPrivateComponent, PrivateLayoutComponent } from './layout';

import { PRODUCT_ENTITY_NAME, entityMetadata, pluralNames } from './shared/store';
import { ProductDataService, ProductEntityService } from './shared/services';

@NgModule({
  declarations: [PrivateLayoutComponent, HomeComponent, HeaderPrivateComponent, FooterPrivateComponent],
  imports: [CommonModule, PrivateRoutingModule, UiComponentsModule, SharedModule],
  exports: [PrivateLayoutComponent],
  providers: [
    ProductEntityService,
    ProductDataService,
    {
      provide: PLURAL_NAMES_TOKEN,
      multi: true,
      useValue: pluralNames,
    },
  ],
})
export class PrivateModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private elementDataService: ProductDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService(PRODUCT_ENTITY_NAME, elementDataService);
  }
}
