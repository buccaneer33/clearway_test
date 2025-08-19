import { ComponentFactoryResolver, Directive, ElementRef, ViewContainerRef, Renderer2, OnInit, input } from '@angular/core';
import { AnnotationComponent } from './annotation.component';
import { AnnonationsService } from '../services/annonations.service';
import { Annotation } from '../interface/annotation.interface';

@Directive({
  selector: '[appAnnotations]',
  standalone: false
})
export class AnnotationDirective implements OnInit {
  secId = input.required<number>();

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private annotationService: AnnonationsService
  ) {

  }

 ngOnInit(): void {
    this.annotationService
    .getCommentsBySectionId(this.secId())
    .subscribe(
      data => {
        data.forEach(comment => this.generateChild(comment));
      }
    )
  }
  generateChild(comment: Annotation){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AnnotationComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const host = this.element.nativeElement;
    host.insertBefore(componentRef.location.nativeElement, host.firstChild)
  }
}
