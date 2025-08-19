import { Component, inject, input, effect, untracked, output } from '@angular/core';
import { PaginationItem } from '../interface/pagination.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: false,
})
export class PaginationComponent {
  readonly list = input.required<PaginationItem[] | undefined>();
  readonly orientation = input<'vertical' | 'horisontal'>('horisontal');
  readonly current = input<number>();
  readonly newPage = input<number>();
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly zoomEmitter = output<'+' | '-'>();
  readonly saveEmitter = output<void>();

  currentChange = effect(() => {
    const newCurrent = this.newPage();
    untracked(() => {
      newCurrent && this.paginationEvent(newCurrent);
    })
  })

  paginationEvent(value: number){
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {'id': value}})
  }
  zoomClick(event: '+' | '-'){
    this.zoomEmitter.emit(event);
  }
  saveClick(){
    this.saveEmitter.emit();
  }
}
