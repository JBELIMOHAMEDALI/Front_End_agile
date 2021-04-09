import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEntretienComponent } from './popup-entretien.component';

describe('PopupEntretienComponent', () => {
  let component: PopupEntretienComponent;
  let fixture: ComponentFixture<PopupEntretienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEntretienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
