import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCarnetdeboardComponent } from './popup-carnetdeboard.component';

describe('PopupCarnetdeboardComponent', () => {
  let component: PopupCarnetdeboardComponent;
  let fixture: ComponentFixture<PopupCarnetdeboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCarnetdeboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCarnetdeboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
