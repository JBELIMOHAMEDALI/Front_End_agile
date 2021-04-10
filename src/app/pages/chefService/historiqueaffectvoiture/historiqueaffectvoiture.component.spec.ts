import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueaffectvoitureComponent } from './historiqueaffectvoiture.component';

describe('HistoriqueaffectvoitureComponent', () => {
  let component: HistoriqueaffectvoitureComponent;
  let fixture: ComponentFixture<HistoriqueaffectvoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueaffectvoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueaffectvoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
