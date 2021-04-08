import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetDeBoardComponent } from './carnet-de-board.component';

describe('CarnetDeBoardComponent', () => {
  let component: CarnetDeBoardComponent;
  let fixture: ComponentFixture<CarnetDeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetDeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetDeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
