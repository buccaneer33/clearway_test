import { Component, computed, effect, inject, OnInit, Signal  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationItem } from '../interface/pagination.interface';

@Component({
  selector: '[app-page]',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(PagesService);

  pagesList: Signal <number[] | undefined> = toSignal(this.dataService.pagesNum$);;
  paginationList: Signal <PaginationItem[] | undefined> = computed(() => {
    const pages = this.pagesList()
    return pages && pages.map(pageNum => {
      return <PaginationItem>{
        label: `${pageNum}`,
        value: `${pageNum}`,
      }
    })
  });;


 constructor(){
    this.dataService.getPages();
 }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => console.log(data))
  }
}
