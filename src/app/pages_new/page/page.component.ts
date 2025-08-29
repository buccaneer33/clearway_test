import { AfterContentInit, ChangeDetectionStrategy, Component, computed, DestroyRef, HostListener, inject, signal, Signal, effect, untracked, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../services/pages.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PaginationItem } from '../interface/pagination.interface';
import { Page } from '../interface/page.interface';
import { debounceTime, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { PageContentComponent } from '../page-content/page-content.component';
import { ScrollService } from '../services/scroll.service';

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
  private destroyRef = inject(DestroyRef);

  @ViewChildren(PageContentComponent, { read: ElementRef }) private childElements!: QueryList<ElementRef>;

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

  _scrolledSection = new BehaviorSubject<number>(0);
  get scrolledSection$(){
    return this._scrolledSection.asObservable().pipe(debounceTime(200), takeUntilDestroyed(this.destroyRef))
  }
  scrolledSection = toSignal(this.scrolledSection$)

  isConnentLoaded = effect(() => {
    const pages = this.pagesContent();
    untracked(() => {
      this.routerListener();
    });
  });

  anchorPrefix = 'anchor_';
  private scroller = inject(ScrollService);

  constructor(){
    this.dataService.getPages();
  }
  ngAfterContentInit(): void {}

  routerListener(){
    setTimeout(() => {
      this.activatedRoute
        .params
        .pipe(
          map(param => param['id']),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: data => {
            this.scroller.scrollToElementById(`${this.anchorPrefix}${data}`)
            this.onScroll();
          }
        });
    }, 1000)
  }
  onScroll() {
    if(!this.childElements.length) {return;}
    const container = this.childElements.first.nativeElement.parentElement;
    const scrollTop = container.scrollTop;
    const scrollBottom = scrollTop + container.clientHeight;

    this.childElements.forEach((childEl, index) => {
      const childTop = childEl.nativeElement.offsetTop;
      const childBottom = childTop + childEl.nativeElement.offsetHeight;

      if (childTop >= scrollTop && childTop < scrollBottom - 500) {
        this._scrolledSection.next(index + 1);
      }
    });
  }


  /*
  newPage = signal<number>(0);
  scale = signal<number>(0);

  @HostListener('window:keydown', ['$event']) handleKeyDown(event: KeyboardEvent) {
    this.zoomHandler(event.key);
  }

  zoomHandler(key: string){
    if(!['+', '-'].includes(key)){ return; }
    if(key === '+'){
      this.scale() < 10 && this.scale.set(+this.scale() + 1)
    } else {
      this.scale() > 0 && this.scale.set(+this.scale() - 1)
    }
  }*/

}
