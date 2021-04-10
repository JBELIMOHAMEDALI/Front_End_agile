import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoituresinactifsComponent } from './voituresinactifs.component';

describe('VoituresinactifsComponent', () => {
  let component: VoituresinactifsComponent;
  let fixture: ComponentFixture<VoituresinactifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoituresinactifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoituresinactifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
