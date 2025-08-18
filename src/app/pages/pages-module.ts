import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PagesService } from './pages.service';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './pages.routes';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { PageContentComponent } from './page-content/page-content.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    PageComponent,
    PagesComponent,
    PaginationComponent,
    PageContentComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  providers: [
    PagesService,
    provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled'})),
    importProvidersFrom(HttpClientModule)
  ]
})
export class PagesModule { }
