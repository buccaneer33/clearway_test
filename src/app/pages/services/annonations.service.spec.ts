import { TestBed } from '@angular/core/testing';

import { AnnonationsService } from './annonations.service';

describe('AnnonationsService', () => {
  let service: AnnonationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
