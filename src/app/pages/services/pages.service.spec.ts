import { TestBed } from '@angular/core/testing';

import { PagesService } from './pages.service.js';

describe('PagesServiceTs', () => {
  let service: PagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
