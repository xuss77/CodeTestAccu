import { TestBed } from '@angular/core/testing';

import { StackExchangeServiceService } from './stack-exchange-service.service';

describe('StackExchangeServiceService', () => {
  let service: StackExchangeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackExchangeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
