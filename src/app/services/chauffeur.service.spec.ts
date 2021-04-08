import { TestBed } from '@angular/core/testing';

import { ChauffeurService } from './chauffeur.service';

describe('ChauffeurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChauffeurService = TestBed.get(ChauffeurService);
    expect(service).toBeTruthy();
  });
});
