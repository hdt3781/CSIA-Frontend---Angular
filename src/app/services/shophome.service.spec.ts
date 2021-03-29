import { TestBed } from '@angular/core/testing';

import { ShophomeService } from './shophome.service';

describe('ShophomeService', () => {
  let service: ShophomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShophomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
