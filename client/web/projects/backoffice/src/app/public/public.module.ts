import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UiComponentsModule } from '@sw-ui-components';

import sessionReducer, { sessionFeatureKey } from '@cad-core/store/reducers/session.reducer';
import { SessionEffects } from '@cad-core/store';

import { SharedModule } from '../shared';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicFooterComponent } from './layout/public-footer/public-footer.component';
import { PublicLayoutComponent } from './layout/public-layout.component';

@NgModule({
  declarations: [PublicFooterComponent, PublicLayoutComponent, LoginComponent],
  imports: [
    PublicRoutingModule,
    SharedModule,
    UiComponentsModule,
    StoreModule.forFeature(sessionFeatureKey, sessionReducer),
    EffectsModule.forFeature([SessionEffects]),
  ],
  exports: [PublicLayoutComponent],
})
export class PublicModule {}
