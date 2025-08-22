import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenu } from "./app-menu/app-menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CLEARWAY TEST');
}
