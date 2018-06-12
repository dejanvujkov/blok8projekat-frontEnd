import { TestBed, inject } from '@angular/core/testing';

import { RACServiceService } from './racservice.service';

describe('RACServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RACServiceService]
    });
  });

  it('should be created', inject([RACServiceService], (service: RACServiceService) => {
    expect(service).toBeTruthy();
  }));
});
