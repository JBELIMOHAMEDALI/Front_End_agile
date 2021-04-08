import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectvoitureComponent } from './affectvoiture.component';

describe('AffectvoitureComponent', () => {
  let component: AffectvoitureComponent;
  let fixture: ComponentFixture<AffectvoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectvoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectvoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
