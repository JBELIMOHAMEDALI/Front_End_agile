import { TestBed } from '@angular/core/testing';

import { CarnetDeboardService } from './carnet-deboard.service';

describe('CarnetDeboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarnetDeboardService = TestBed.get(CarnetDeboardService);
    expect(service).toBeTruthy();
  });
});
