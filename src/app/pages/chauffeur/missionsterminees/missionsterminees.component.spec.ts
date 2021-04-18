import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionstermineesComponent } from './missionsterminees.component';

describe('MissionstermineesComponent', () => {
  let component: MissionstermineesComponent;
  let fixture: ComponentFixture<MissionstermineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionstermineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionstermineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
