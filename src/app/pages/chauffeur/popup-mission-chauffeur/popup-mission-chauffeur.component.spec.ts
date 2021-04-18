import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMissionChauffeurComponent } from './popup-mission-chauffeur.component';

describe('PopupMissionChauffeurComponent', () => {
  let component: PopupMissionChauffeurComponent;
  let fixture: ComponentFixture<PopupMissionChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMissionChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMissionChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
