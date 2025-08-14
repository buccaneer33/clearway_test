import { Component, inject, OnInit, Signal  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
   pagesList;


 constructor(private activatedRoute: ActivatedRoute, private dataService: PagesService){
    this.dataService.getPages();
    this.pagesList = toSignal(this.dataService.pagesNum$)
 }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => console.log(data))
  }
}
