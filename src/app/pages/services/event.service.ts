import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { EditorParams } from '../interface/annotation.interface';
import { AnnonationsService } from './annonations.service';
import { zoomDirection } from "../interface/zoom.interface";

interface ZoomState {
  sectionId: number;
  value: number;
  direction: zoomDirection
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _editor = new BehaviorSubject<EditorParams | null>(null);
  get editor$(){
    return this._editor.asObservable().pipe(filter(value => !!value));
  }
  private _zoomState = new BehaviorSubject<ZoomState[]>([]);
  private get zoomState(){
    return this._zoomState.getValue();
  }
  getZoomStateById$(id: number): Observable<ZoomState[]>{
    return this._zoomState
      .asObservable()
      .pipe(
        map(states => states.filter(state => state.sectionId === id)),
        filter(state => !!state)
      )
  }

  private annotationsService = inject(AnnonationsService);

  openEditor(params: EditorParams){
    this._editor.next(params);
  }
  zoomEvent(direction: zoomDirection, sectionId: number){
    let sectionZoomState = this.zoomState.filter(sectionState => sectionState.sectionId === sectionId);
    const filtered = this.zoomState.filter(sectionState => sectionState.sectionId !== sectionId);

    if(!sectionZoomState || !sectionZoomState.length){
      sectionZoomState = [{
        sectionId,
        value: 0,
        direction: zoomDirection['+']
      }];
    }
    let scaleStap: number = 0;

    switch(direction){
      case zoomDirection['+']:
        scaleStap = (sectionZoomState[0]['value'] < 1)  ? sectionZoomState[0]['value'] + 0.1 : sectionZoomState[0]['value'];
        break;
      case zoomDirection['-']:
        scaleStap = (sectionZoomState[0]['value'] > 0)  ? sectionZoomState[0]['value'] - 0.1 : sectionZoomState[0]['value'];
        break;
    }

    sectionZoomState[0]['value'] = +Number.parseFloat(`${scaleStap}`).toFixed(1);
    sectionZoomState[0]['direction'] = direction;
    this._zoomState.next([...filtered, sectionZoomState[0]])
  }
  saveAnnotations(){
    console.log(this.annotationsService.comments);
  }
}
