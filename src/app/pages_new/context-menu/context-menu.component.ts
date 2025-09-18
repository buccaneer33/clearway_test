import { Component, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorParams } from '../interface/annotation.interface';
import { EventService } from '../services/event.service';
import { zoomDirection } from "../interface/zoom.interface";

@Component({
  selector: 'app-context-menu.component',
  standalone: true,
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  imports: [CommonModule]
})
export class ContextMenuComponent {
  x: Signal<number> = signal(0);
  y: Signal<number> = signal(0);
  show : Signal<boolean> = signal(false);
  sectionId: Signal<number> = signal(0);

  eventService = inject(EventService);
  _zoomDirection = zoomDirection

  addAnnotation(){
    this.eventService.openEditor(<EditorParams>{secId: this.sectionId(), x: this.x(), y: this.y()})
  }
  saveAnnotations(){
    this.eventService.saveAnnotations();
  }
  zoom(event: zoomDirection){
    this.eventService.zoomEvent(event, this.sectionId())
  }
}
