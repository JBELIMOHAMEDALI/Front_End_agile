import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionChauffeursComponent } from './gestion-chauffeurs.component';

describe('GestionChauffeursComponent', () => {
  let component: GestionChauffeursComponent;
  let fixture: ComponentFixture<GestionChauffeursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionChauffeursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionChauffeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
