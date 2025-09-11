import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { EditorParams } from '../interface/annotation.interface';

enum zoomDirection { '+', '-' }

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _editor = new BehaviorSubject<EditorParams | null>(null);
  get editor$(){
    return this._editor.asObservable().pipe(filter(value => !!value));
  }
  private _zoomState = new BehaviorSubject<{[key: string]: number}[]>([]);
  private get zoomState(){
    return this._zoomState.getValue();
  }

  openEditor(params: EditorParams){
    this._editor.next(params);
  }
  zoomEvent(direction: zoomDirection, sectionId: number){
    const sectionZoomState = this.zoomState.filter(sectionState => sectionState['id'] === sectionId);
    const filtered = this.zoomState.filter(sectionState => sectionState['id'] !== sectionId);
    if(sectionZoomState && sectionZoomState.length){
      switch(direction){
        case zoomDirection['+']:
          sectionZoomState[0]['value'] = sectionZoomState[0]['value']++;
          break;
        case zoomDirection['-']:
          sectionZoomState[0]['value'] = sectionZoomState[0]['value']--;
          break;
      }
      this._zoomState.next([...filtered, sectionZoomState[0]])
    }
  }
}
