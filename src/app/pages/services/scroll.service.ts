import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  router = inject(Router);

  scrollToElementById(id: string) {
    const element = this.__getElementById(id);
    element && this.scrollToElement(element);
  }

  private __getElementById(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
