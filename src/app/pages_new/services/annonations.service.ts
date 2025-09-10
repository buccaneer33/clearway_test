import { Injectable } from '@angular/core';
import { Annotation, EditorParams } from '../interface/annotation.interface';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonationsService {

  private _comments = new BehaviorSubject<Annotation[]>([]);
  get comments$(){
    return this._comments.asObservable();
  }
  get comments(){
    return this._comments.getValue()
  }

  private _editor = new BehaviorSubject<EditorParams | null>(null);
  get editor$(){
    return this._editor.asObservable().pipe(filter(value => !!value));
  }

  constructor(){
    const anns = localStorage.getItem('annotations');
    if(anns){
      const annArr = JSON.parse(anns);
      this._comments.next(annArr);
    }
  }


  getCommentsBySectionId(secId: number){
    return this.comments$
    .pipe(
      map(comments => comments.filter(comment => comment.secId === secId))
    );
  }
  setNew(sectionId: number, content: string, x: number, y: number): Annotation{
    const ids = this.comments.map(comments => comments.id);
    let maxId = 0;
    if (ids.length){
      maxId = Math.max.apply(null, this.comments.map(comments => comments.id));
    }

    const obj: Annotation = {
      secId: sectionId,
      id: maxId + 1,
      x,
      y,
      content,
    };
    return obj;
  }
  addAnnotation(sectionId: number, content: string, x: number, y: number){
    const annObj = [...this.comments, this.setNew(sectionId, content, x, y)]
    localStorage.setItem('annotations', JSON.stringify(annObj));
    this._comments.next(annObj);
  }
  removeAnnotation(id: number){
    const list = this.comments.filter(comment => comment.id !== id);
    this._comments.next(list);
    localStorage.setItem('annotations', JSON.stringify(list));
  }
  replaceAnnotation(id: number, x: number, y: number){
     const list = this.comments.filter(comment => comment.id !== id);
     const replaced =  this.comments.filter(comment => comment.id === id)[0];
     replaced.x = x;
     replaced.y = y;
     const annObj = [...list, replaced]
     this._comments.next(annObj);
     localStorage.setItem('annotations', JSON.stringify(annObj));
  }

  openEditor(params: EditorParams){
    this._editor.next(params);
  }
}
