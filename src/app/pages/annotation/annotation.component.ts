import { CommonModule } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { AnnonationsService } from '../services/annonations.service';

@Component({
  selector: 'app-annotation.component',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss'
})
export class AnnotationComponent {
  x!: Signal<number>;
  y!: Signal<number>;
  sectionId!: Signal<number>;
  content!: Signal<string>;
  id!: Signal<number>;

  annotationService = inject(AnnonationsService);

  dragPosition(event: CdkDragEnd){
    console.log('event: ', event)
    this.annotationService.replaceAnnotation(
      this.id(),
      //event.dropPoint.x,
      this.x() + event.distance.x,
      //event.dropPoint.y
      this.y() + event.distance.y
    );
  }
  remove(){
    this.annotationService.removeAnnotation(this.id())
  }
}
