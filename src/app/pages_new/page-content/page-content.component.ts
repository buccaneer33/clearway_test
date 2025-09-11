import {
  Component,
  input,
} from '@angular/core';
import { ContextDirective } from '../directives/context.directive';
import { AnnotationsComponent } from '../annotations/annotations.component';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  standalone: true,
  imports: [
    ContextDirective,
    AnnotationsComponent,
    PinchZoomComponent
  ]
})

export class PageContentComponent {
  readonly id = input.required<number>();
  readonly idPrefix = input.required<string>();
  readonly content = input.required<string>();
}
