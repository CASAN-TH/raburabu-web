import { TestBed, inject } from '@angular/core/testing';

import { HistoryServiceService } from './history-service.service';

describe('HistoryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryServiceService]
    });
  });

  it('should be created', inject([HistoryServiceService], (service: HistoryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
