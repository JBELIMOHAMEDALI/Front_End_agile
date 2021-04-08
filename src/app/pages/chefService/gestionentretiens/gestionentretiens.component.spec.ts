import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionentretiensComponent } from './gestionentretiens.component';

describe('GestionentretiensComponent', () => {
  let component: GestionentretiensComponent;
  let fixture: ComponentFixture<GestionentretiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionentretiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionentretiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
