import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '@environment/environment'
import { BehaviorSubject, filter, map, Subject } from 'rxjs';
import { Page, PagesResponse } from './interface/page.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PagesService implements OnDestroy {

  private http = inject(HttpClient);
  destroyRef = inject(DestroyRef)

  private _pagesData = new BehaviorSubject<Page[] | null>(null)
  get pagesData$(){
    return this._pagesData
    .asObservable()
    .pipe(
      filter(item => !!item),
      takeUntilDestroyed(this.destroyRef)
    );
  }
  get pagesNum$(){
    return this._pagesData
    .asObservable()
    .pipe(
      filter(item => !!item),
      map(items => {
        console.log(items);
        return items.map(item => item.number )
      }),
      takeUntilDestroyed(this.destroyRef)
    )
  }

  getPages(){
    console.log('get_pages', environment)
    if(!environment.dataUrl) { return ; }
    this.http
      .get<PagesResponse>(environment.dataUrl)
      .pipe(
        map(items => items?.pages),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(
        data => data && this._pagesData.next(data),
        error => console.error(error)

      )

  }
    ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
