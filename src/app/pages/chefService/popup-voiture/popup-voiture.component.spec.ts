import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVoitureComponent } from './popup-voiture.component';

describe('PopupVoitureComponent', () => {
  let component: PopupVoitureComponent;
  let fixture: ComponentFixture<PopupVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
