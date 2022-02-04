import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '@cad-core/guards/can-deactivate-guard.service';

import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';

export const elementsModuleRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'edit/:id',
    component: CreateProductComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(elementsModuleRoutes)],
  exports: [RouterModule],
})
export class ElementsRoutingModule {}
