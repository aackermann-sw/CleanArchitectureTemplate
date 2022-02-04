import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiComponentsModule } from '@sw-ui-components';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule, ReactiveFormsModule, UiComponentsModule, TranslateModule, ProgressSpinnerModule],
  exports: [RouterModule, ReactiveFormsModule, UiComponentsModule, TranslateModule, ProgressSpinnerModule],
})
export class SharedModule {}
