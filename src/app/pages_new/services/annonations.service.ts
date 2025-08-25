import { Injectable } from '@angular/core';
import { Annotation } from '../interface/annotation.interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonationsService {

  _comments = new BehaviorSubject<Annotation[]>([]);
  get comments$(){
    return this._comments.asObservable();
  }
  get comments(){
    return this._comments.getValue()
  }

  getCommentsBySectionId(secId: number){
    return this._comments
    .asObservable()
    .pipe(
      map(comments => comments.filter(comment => comment.secId === secId))
    );
  }
  setNew(sectionId: number, content: string, x: number, y: number): Annotation{
    const maxId = Math.max.apply(null, this.comments.map(comments => comments.id));
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
    this._comments.next([...this.comments, this.setNew(sectionId, content, x, y)]);
  }
  removeAnnotation(id: number){
    const list = this.comments.filter(comment => comment.id !== id);
    this._comments.next(list);
  }
  replaceAnnotation(id: number, x: number, y: number){}
}
