import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages-module').then(m => m.PagesModule)
  },
    {
    path: 'pages_new',
    loadChildren: () => import('./pages_new/pages.routes').then(m => m.PageRoutes)
  },
];
