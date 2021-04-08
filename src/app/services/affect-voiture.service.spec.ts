import { TestBed } from '@angular/core/testing';

import { AffectVoitureService } from './affect-voiture.service';

describe('AffectVoitureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffectVoitureService = TestBed.get(AffectVoitureService);
    expect(service).toBeTruthy();
  });
});
