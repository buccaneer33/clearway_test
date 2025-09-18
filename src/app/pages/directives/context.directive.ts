import { Directive, ElementRef, ViewContainerRef, OnInit, HostListener, signal, inject, input } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Directive({
  selector: '[appContext]',
  standalone: true,
})
export class ContextDirective implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private element = inject(ElementRef);
  sectionId = input<number>(0);
  contextmenu = signal<boolean>(false);
  contextmenuX = signal<number>(0);
  contextmenuY = signal<number>(0);

  @HostListener('contextmenu', ['$event']) onRightClick(event: MouseEvent) {
    this.onrightClick(event)
    event.stopPropagation();
    event.preventDefault();
  }
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.contextmenu.set(false);
  }
  onrightClick(event: MouseEvent) {
    console.log(event);
    this.contextmenuX.set(event.layerX); // clientX
    this.contextmenuY.set(event.layerY); // clientY
    this.contextmenu.set(true);
  }

  ngOnInit(): void {
    const compRef = this.viewContainerRef.createComponent(ContextMenuComponent);
    compRef.instance.x = this.contextmenuX;
    compRef.instance.y = this.contextmenuY;
    compRef.instance.show = this.contextmenu;
    compRef.instance.sectionId = this.sectionId;
    const host = this.element.nativeElement;
    host.insertBefore(compRef.location.nativeElement, host.firstChild)
  }
}
