import { Component, inject, input } from '@angular/core';
import { PaginationItem } from '../interface/pagination.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
})
export class PaginationComponent {
  readonly list = input.required<PaginationItem[] | undefined>();
  readonly current = input<number>();
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly currentRoute$ = this.activatedRoute.params.pipe(map(param => param['id']))
  //readonly zoomEmitter = output<'+' | '-'>();
  //readonly saveEmitter = output<void>();


  /*zoomClick(event: '+' | '-'){
    this.zoomEmitter.emit(event);
  }
  saveClick(){
    this.saveEmitter.emit();
  }*/
}
