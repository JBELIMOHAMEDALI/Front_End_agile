import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPrelevementMatrComponent } from './document-prelevement-matr.component';

describe('DocumentPrelevementMatrComponent', () => {
  let component: DocumentPrelevementMatrComponent;
  let fixture: ComponentFixture<DocumentPrelevementMatrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPrelevementMatrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPrelevementMatrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
