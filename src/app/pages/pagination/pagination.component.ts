import { EventService } from './../services/event.service';
import { Component, inject, input } from '@angular/core';
import { PaginationItem } from '../interface/pagination.interface';
import { RouterLink } from '@angular/router';
import { zoomDirection } from "../interface/zoom.interface";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: true,
  imports: [
    RouterLink,
  ],
})
export class PaginationComponent {
  readonly list = input.required<PaginationItem[] | undefined>();
  readonly scrolled = input<number>();
  private eventService = inject(EventService);

  _zoomDirection = zoomDirection;

  zoomClick(event: zoomDirection) {
    const section = this.scrolled();
    section && this.eventService.zoomEvent(event, section);
  }
  saveClick() {
    this.eventService.saveAnnotations();
  }
}
