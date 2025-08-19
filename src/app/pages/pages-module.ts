import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PagesService } from './services/pages.service';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './pages.routes';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { PageContentComponent } from './page-content/page-content.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { ContextDirective } from './context/context.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { AnnonationsService } from './services/annonations.service';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnnotationDirective } from './annotation/annotation.directive';

@NgModule({
  declarations: [
    PageComponent,
    PagesComponent,
    PaginationComponent,
    PageContentComponent,
    ContextDirective,
    ContextMenuComponent,
    AnnotationComponent,
    AnnotationDirective
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    PinchZoomComponent
  ],
  providers: [
    PagesService,
    AnnonationsService,
    provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled'})),
    importProvidersFrom(HttpClientModule)
  ]
})
export class PagesModule { }
