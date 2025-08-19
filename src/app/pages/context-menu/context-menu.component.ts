import { Component, inject, signal, Signal } from '@angular/core';
import { AnnonationsService } from '../services/annonations.service';

@Component({
  selector: 'app-context-menu.component',
  standalone: false,
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
  x: Signal<number> = signal(0);
  y: Signal<number> = signal(0);
  show : Signal<boolean> = signal(false);

  annotationService = inject(AnnonationsService);
}
