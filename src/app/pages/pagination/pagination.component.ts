import { Component, input } from '@angular/core';
import { PaginationItem } from '../interface/pagination.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: false,
})
export class PaginationComponent {
  readonly list = input.required<PaginationItem[] | undefined>()
  readonly orientation = input<'vertical' | 'horisontal'>('vertical')

}
