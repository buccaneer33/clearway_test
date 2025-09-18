import { EventService } from './../services/event.service';
import {
  Component,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { ContextDirective } from '../directives/context.directive';
import { AnnotationsComponent } from '../annotations/annotations.component';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { zoomDirection } from '../interface/zoom.interface';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  standalone: true,
  imports: [
    ContextDirective,
    AnnotationsComponent,
    PinchZoomComponent
  ]
})

export class PageContentComponent {
  readonly id = input.required<number>();
  readonly idPrefix = input.required<string>();
  readonly content = input.required<string>();
  private eventService = inject(EventService);

  @ViewChild(PinchZoomComponent) pinchZoom: PinchZoomComponent | undefined;
  prevScale: number = 0;

  ngOnInit() {
    this.eventService
      .getZoomStateById$(this.id())
      .subscribe(
        (zoomState) => {
          if(!zoomState || !zoomState.length){ return; }
          console.log('state: ', zoomState)
          if(zoomState[0].value !== undefined && this.pinchZoom){
            if(zoomState[0].value !== this.prevScale) {
              if(zoomState[0].value !== 0){
                switch(zoomState[0].direction){
                  case zoomDirection['+']:
                    this.pinchZoom.zoomIn(zoomState[0].value);
                    break;
                  case zoomDirection['-']:
                    this.pinchZoom.zoomOut(zoomState[0].value);
                    break;
                }
              } else {
                this.pinchZoom.toggleZoom();
              }
            }
            this.prevScale = zoomState[0].value;
        }
      });
  }
}
