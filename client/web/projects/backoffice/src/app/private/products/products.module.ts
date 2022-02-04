import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@cad-shared/shared.module';
import elementReducer, { elementFeatureKey } from './shared/store/element.reducer';
import { ElementsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { CreateProductService, ProductResolver } from './shared';
import { ElementEffects } from './shared/store/element.effects';
import { CreateProductComponent } from './create-product/create-product.component';

@NgModule({
  declarations: [ProductsComponent, CreateProductComponent],
  imports: [
    SharedModule,
    ElementsRoutingModule,
    EffectsModule.forFeature([ElementEffects]),
    StoreModule.forFeature(elementFeatureKey, elementReducer),
  ],
  exports: [ElementsRoutingModule],
  providers: [CreateProductService, ProductResolver],
})
export class ElementsModule {}
