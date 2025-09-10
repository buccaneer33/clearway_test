import { ComponentFactoryResolver, Directive, ElementRef, ViewContainerRef, Renderer2, OnInit, HostListener, signal } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Directive({
  selector: '[appContext]',
  standalone: false
})
export class ContextDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
      this.element.nativeElement.oncontextmenu = () => { return false };
  }
  @HostListener('document:contextmenu', ['$event']) onRightClick(event: MouseEvent) {
    console.log(event);
    this.onrightClick(event)
    event.stopPropagation();
  }
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    console.log(event);
    this.disableContextMenu()
    event.stopPropagation();
  }


  contextmenu = signal<boolean>(false);
  contextmenuX = signal<number>(0);
  contextmenuY = signal<number>(0);

  onrightClick(event: MouseEvent) {
    this.contextmenuX.set(event.x); // clientX
    this.contextmenuY.set(event.y - 100); // clientY
    this.contextmenu.set(true);
  }
  //disables the menu
  disableContextMenu() {
    this.contextmenu.set(false);
  }
  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.x = this.contextmenuX;
    componentRef.instance.y = this.contextmenuY;
    componentRef.instance.show = this.contextmenu;
    const host = this.element.nativeElement;
    host.insertBefore(componentRef.location.nativeElement, host.firstChild)
  }
}
