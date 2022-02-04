import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { HttpTokenInterceptor } from './interceptors';
import { ApiService, AuthGuard, JwtService, AuthService } from './services';
import { OverlayElementsComponent } from './layout';

@NgModule({
  imports: [CommonModule, ToastModule],
  providers: [MessageService, ApiService, AuthGuard, JwtService, DialogService],
  exports: [ToastModule, OverlayElementsComponent],
  declarations: [OverlayElementsComponent],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }, AuthService],
    };
  }
}
