import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMissionComponent } from './popup-mission.component';

describe('PopupMissionComponent', () => {
  let component: PopupMissionComponent;
  let fixture: ComponentFixture<PopupMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
