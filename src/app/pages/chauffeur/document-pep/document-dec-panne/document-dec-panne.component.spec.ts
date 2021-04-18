import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDecPanneComponent } from './document-dec-panne.component';

describe('DocumentDecPanneComponent', () => {
  let component: DocumentDecPanneComponent;
  let fixture: ComponentFixture<DocumentDecPanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDecPanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDecPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
