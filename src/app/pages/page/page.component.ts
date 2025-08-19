import { AfterContentInit, Component, computed, DestroyRef, HostListener, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../services/pages.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PaginationItem } from '../interface/pagination.interface';
import { Page } from '../interface/page.interface';
import { ViewportScroller } from '@angular/common';
import { delay, filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: '[app-page]',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements AfterContentInit {
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(PagesService);
  private scroller = inject(ViewportScroller);
  anchorPrefix = 'anchor_';
  destroyRef = inject(DestroyRef);
  private childrenReady = new BehaviorSubject<number[]>([]);
  currentPage = signal<number>(0);
  newPage = signal<number>(0);
  scale = signal<number>(0);

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

 constructor(){
    this.dataService.getPages();
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
  }

  ngAfterContentInit(): void {
   this.childrenReady
    .pipe(
      filter(pages => pages.length === this.pagesList()?.length),
      switchMap(() => this.activatedRoute.queryParams),
      //TODO remove delay
      delay(800),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(data => {
      this.currentPage.set(+data['id'])
      this.scrollTo(`${data['id']}`)
    })
  }

  scrollTo(id: string){
    const anchor = `#${this.anchorPrefix}${id}`;
    //TODO make scroll via scroller
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView();
    }
  }
}
