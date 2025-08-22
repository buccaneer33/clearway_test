import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { PagesService } from './services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: [
    PagesService
  ]
})
export class PagesComponent {}
