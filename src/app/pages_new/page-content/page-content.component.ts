import {
  AfterContentInit,
  Component,
  input,
  OnDestroy,
} from '@angular/core';
// import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  standalone: true,
})

export class PageContentComponent implements AfterContentInit, OnDestroy {
  readonly id = input.required<number>();
  readonly idPrefix = input.required<string>();
  readonly content = input.required<string>();
  //readonly scale = input.required<number>();
  //readonly currentPage = input.required<number>();

  //private prevScale = 0;

  //readonly isReady = output<number>();

  //@ViewChild(PinchZoomComponent) pinchZoom: PinchZoomComponent | undefined;

  /*scaleImg = effect(() => {
    const currScale = this.scale();
    untracked(() => {
      if(this.currentPage() !== this.id()){ return; }
      if(currScale !== undefined && this.pinchZoom){
        const scaleStep = currScale === 0 ? 0 : Math.abs(currScale) / 10;
        if(currScale === 0) {
          this.pinchZoom.toggleZoom();
        } else
        if(currScale > this.prevScale){
          this.pinchZoom.zoomIn(scaleStep);
        } else {
          this.pinchZoom.zoomOut(scaleStep);
        }
        this.prevScale = currScale;
      }
    })
  })*/
  onRightClick(event: any){
    //console.log(event);
  }

  ngAfterContentInit(): void {
    //this.isReady.emit(this.id());
  }
  ngOnDestroy(): void {
    //this.pinchZoom && this.pinchZoom.destroy();
  }
}
