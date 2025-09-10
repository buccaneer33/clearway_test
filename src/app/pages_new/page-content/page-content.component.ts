import {
  Component,
  input,
} from '@angular/core';
import { ContextDirective } from '../directives/context.directive';
import { AnnotationsComponent } from '../annotations/annotations.component';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  standalone: true,
  imports: [
    ContextDirective,
    AnnotationsComponent,
]
})

export class PageContentComponent {
  readonly id = input.required<number>();
  readonly idPrefix = input.required<string>();
  readonly content = input.required<string>();
}
