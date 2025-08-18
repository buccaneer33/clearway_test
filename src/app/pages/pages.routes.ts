import { Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  {
    path: 'page',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: PageComponent,
        outlet: 'pages',
        children: [
        ]
      },
      {
        path: ':id',
        pathMatch: 'full',
        outlet: 'pages',
        component: PageComponent
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'page'
  }
];
