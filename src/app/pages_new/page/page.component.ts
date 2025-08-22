import { AfterContentInit, ChangeDetectionStrategy, Component, computed, DestroyRef, HostListener, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../services/pages.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PaginationItem } from '../interface/pagination.interface';
import { Page } from '../interface/page.interface';
import { ViewportScroller } from '@angular/common';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { PageContentComponent } from '../page-content/page-content.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: true,
  imports: [
    PaginationComponent,
    PageContentComponent
  ],
  providers: [

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements AfterContentInit {
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(PagesService);

  pagesList: Signal <number[] | undefined> = toSignal(this.dataService.pagesNum$);

  paginationList: Signal <PaginationItem[] | undefined> = computed(() => {
    const pages = this.pagesList();
    return pages && pages.map(pageNum => {
      return <PaginationItem>{
        label: `${pageNum}`,
        value: `${pageNum}`,
      }
    })
  });

  pagesContent: Signal <Page[] | undefined> = toSignal(this.dataService.pagesData$);
  anchorPrefix = 'anchor_';
  private scroller = inject(ViewportScroller);

  constructor(){
    this.dataService.getPages();
  }
  ngAfterContentInit(): void {
    this.activatedRoute
    .params
    .pipe(
      map(param => param['id'])
    )
    .subscribe({
      next: data => {
        console.log(data);
        this.scroller.scrollToAnchor(`scroll`)
      }
  });


 }


  /*private scroller = inject(ViewportScroller);

  destroyRef = inject(DestroyRef);
  private childrenReady = new BehaviorSubject<number[]>([]);
  currentPage = signal<number>(0);
  newPage = signal<number>(0);
  scale = signal<number>(0);





  @HostListener('wheel', ['$event']) onWheelScroll(event: WheelEvent) {
    const pages = this.pagesList();
    const maxPage = pages && Math.max.apply(null, pages);
    const minPage = pages && Math.min.apply(null, pages);

    if (event.deltaY <= 0){
      if(minPage && this.currentPage() > minPage){
        this.newPage.set(+this.currentPage() - 1);
      }
    } else {
      if(maxPage && this.currentPage() < maxPage ){
        this.newPage.set(+this.currentPage() + 1);
      }
    }
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('window:keydown', ['$event']) handleKeyDown(event: KeyboardEvent) {
    this.zoomHandler(event.key);
  }


  childSetReady(childReport: number){
    this.childrenReady.next([...this.childrenReady.getValue(), childReport])
  }
  zoomHandler(key: string){
    if(!['+', '-'].includes(key)){ return; }
    if(key === '+'){
      this.scale() < 10 && this.scale.set(+this.scale() + 1)
    } else {
      this.scale() > 0 && this.scale.set(+this.scale() - 1)
    }
  }*/



  /*scrollTo(id: string){
    const anchor = `#${this.anchorPrefix}${id}`;
    //TODO make scroll via scroller
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView();
    }
  }*/
}
