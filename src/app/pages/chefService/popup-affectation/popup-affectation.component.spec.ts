import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAffectationComponent } from './popup-affectation.component';

describe('PopupAffectationComponent', () => {
  let component: PopupAffectationComponent;
  let fixture: ComponentFixture<PopupAffectationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAffectationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
