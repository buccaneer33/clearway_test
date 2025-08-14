import { Routes } from '@angular/router';
import { PagesModule } from './pages/pages-module';

export const routes: Routes = [
  {
    path: '**',
    loadChildren: () => import('./pages/pages-module').then(m => m.PagesModule)
  }
];
