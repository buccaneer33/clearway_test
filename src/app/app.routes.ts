import { Routes } from '@angular/router';
import { PagesModule } from './pages/pages-module';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages-module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
];
