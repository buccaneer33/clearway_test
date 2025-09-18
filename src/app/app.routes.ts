import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.routes').then(m => m.PageRoutes)
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  }
];
