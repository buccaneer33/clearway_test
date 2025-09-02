import {
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  standalone: true,
})

export class PageContentComponent {
  readonly id = input.required<number>();
  readonly idPrefix = input.required<string>();
  readonly content = input.required<string>();

}
