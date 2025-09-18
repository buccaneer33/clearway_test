import { Route, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

export const PageRoutes: Route[] =  [
  {
    path: '',
    children: [
      {
        path: 'page',
        pathMatch: 'prefix',
        children: [
          {
            path: ':id',
            component: PageComponent,
          },
          {
            path: '',
            redirectTo: '1',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'page',
        pathMatch: 'full'
      }
    ]
  },
];
