import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';

import { UiComponentsModule } from '@sw-ui-components';
import { ProductEntityService } from '@cad-private/shared/services';
import { MessagingService } from '@cad-core/services';
import { elementServiceMock, messagingServiceMock } from '@cad-shared/tests/mocks';

import { ProductsComponent } from './products.component';
import { CreateProductService } from '../shared';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponentsModule, TranslateModule.forRoot(), NoopAnimationsModule, RouterTestingModule],
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductEntityService, useValue: elementServiceMock },
        { provide: CreateProductService, useValue: { element: {} } },
        { provide: MessagingService, useValue: messagingServiceMock },
        { provide: DialogService, useValue: { open: _ => {} } },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Upon initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Upon user interaction', () => {
    it('When pressing the creat button, it should redirect', () => {
      const spy = spyOn(router, 'navigate');
      const createBtn = fixture.debugElement.nativeElement.querySelector('button[id="goToCreate"]');
      createBtn.click();
      expect(spy).toHaveBeenCalledWith(['private', 'products', 'create']);
    });
  });
});
