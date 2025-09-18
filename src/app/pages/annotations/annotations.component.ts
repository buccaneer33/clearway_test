import {
  Component,
  ComponentRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { AnnonationsService } from '../services/annonations.service';
import { Annotation } from '../interface/annotation.interface';
import { AnnotationComponent } from '../annotation/annotation.component';

@Component({
  selector: 'app-annotations',
  imports: [],
  standalone: true,
  templateUrl: './annotations.component.html',
  styleUrl: './annotations.component.scss'
})

export class AnnotationsComponent implements OnInit {
  secId = input.required<number>();
  private viewContainerRef = inject(ViewContainerRef);
  private annotationService = inject(AnnonationsService);

  private comments: Annotation[] = [];
  componentsReferences = Array<ComponentRef<AnnotationComponent>>();

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR!: ViewContainerRef;

  ngOnInit(): void {
    this.annotationService
      .getCommentsBySectionId(this.secId())
      .subscribe(
        data => {
          this.checkAnnotations(data);
        }
      )
  }

  checkAnnotations(comments: Annotation[]){
    const changes = {
      add: <Annotation[]>[],
      remove: <Annotation[]>[]
    }

    if(!this.comments.length){
      changes.add.push(...comments);
    } else {
      const newIds = comments.map(comment => comment.id);
      const oldIds = this.comments.map(comment => comment.id);
      const toAdd = newIds.filter(id => !oldIds.includes(id));
      const toRemove = oldIds.filter(id => !newIds.includes(id));

      changes.add.push(...comments.filter(comment => toAdd.includes(comment.id)));
      changes.remove.push(...this.comments.filter(comment => toRemove.includes(comment.id)));
    }

    changes.add.forEach(comment => this.generateChild(comment));
    changes.remove.forEach(comment => this.removeChild(comment))
    this.comments = comments.slice();
  }
  generateChild(comment: Annotation){
    const compRef = this.viewContainerRef.createComponent(AnnotationComponent);
    compRef.instance.x = signal(comment.x);
    compRef.instance.y = signal(comment.y);
    compRef.instance.content = signal(comment.content);
    compRef.instance.id = signal(comment.id);
    this.componentsReferences.push(compRef);
  }
  removeChild(comment: Annotation){
    const compRef = this.componentsReferences.filter(component => component.instance.id() === comment.id)[0];
    compRef.destroy();
    this.componentsReferences = this.componentsReferences.filter(component => component.instance.id() !== comment.id)
  }
}
