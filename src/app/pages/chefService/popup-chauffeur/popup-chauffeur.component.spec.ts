import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChauffeurComponent } from './popup-chauffeur.component';

describe('PopupChauffeurComponent', () => {
  let component: PopupChauffeurComponent;
  let fixture: ComponentFixture<PopupChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
