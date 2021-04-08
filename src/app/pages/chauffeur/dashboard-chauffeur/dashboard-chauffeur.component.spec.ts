import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChauffeurComponent } from './dashboard-chauffeur.component';

describe('DashboardChauffeurComponent', () => {
  let component: DashboardChauffeurComponent;
  let fixture: ComponentFixture<DashboardChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
