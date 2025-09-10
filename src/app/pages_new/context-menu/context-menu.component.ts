import { Component, inject, signal, Signal } from '@angular/core';
import { AnnonationsService } from '../services/annonations.service';
import { CommonModule } from '@angular/common';
import { EditorParams } from '../interface/annotation.interface';


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

  annotationService = inject(AnnonationsService);

  addAnnotation(){
    this.annotationService.openEditor(<EditorParams>{secId: this.sectionId(), x: this.x(), y: this.y()})
  }
}
