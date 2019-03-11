import { TestBed, inject } from '@angular/core/testing';

import { TeameServiceService } from './teame-service.service';

describe('TeameServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeameServiceService]
    });
  });

  it('should be created', inject([TeameServiceService], (service: TeameServiceService) => {
    expect(service).toBeTruthy();
  }));
});
