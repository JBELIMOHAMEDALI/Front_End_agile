import { TestBed } from '@angular/core/testing';

import { MissionsChauffeurService } from './missions-chauffeur.service';

describe('MissionsChauffeurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissionsChauffeurService = TestBed.get(MissionsChauffeurService);
    expect(service).toBeTruthy();
  });
});
