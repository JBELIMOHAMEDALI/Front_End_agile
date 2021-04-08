import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectmissionComponent } from './affectmission.component';

describe('AffectmissionComponent', () => {
  let component: AffectmissionComponent;
  let fixture: ComponentFixture<AffectmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
