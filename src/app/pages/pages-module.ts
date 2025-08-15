import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PagesService } from './pages.service';
import { provideRouter } from '@angular/router';
import { routes } from './pages.routes';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { PageContentComponent } from './page-content/page-content.component';



@NgModule({
  declarations: [
    PageComponent,
    PaginationComponent,
    PageContentComponent,
  ],
  imports: [
    CommonModule,
],
  providers: [
    PagesService,
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
})
export class PagesModule { }
