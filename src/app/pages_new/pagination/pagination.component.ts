import { Component, inject, input } from '@angular/core';
import { PaginationItem } from '../interface/pagination.interface';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: true,
  imports: [
    RouterLink,
  ],
})
export class PaginationComponent {
  readonly list = input.required<PaginationItem[] | undefined>();
  readonly scrolled = input<number>();
  readonly router = inject(Router);
}
