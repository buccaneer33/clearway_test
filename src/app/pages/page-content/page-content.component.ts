import { AfterContentInit, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  standalone: false,
})
export class PageContentComponent implements AfterContentInit {
  readonly id = input.required<number>()
  readonly idPrefix = input.required<string>()
  readonly content = input.required<string>()
  readonly isReady = output<number>()

  ngAfterContentInit(): void {
    this.isReady.emit(this.id())
  }
}
