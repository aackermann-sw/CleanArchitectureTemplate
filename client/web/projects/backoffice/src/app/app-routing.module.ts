import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/services';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'private',
  },
  {
    path: 'private',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./private/private.module').then(p => p.PrivateModule),
      },
    ],
  },
  {
    path: 'public',
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
