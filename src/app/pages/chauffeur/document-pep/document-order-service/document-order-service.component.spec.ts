import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentOrderServiceComponent } from './document-order-service.component';

describe('DocumentOrderServiceComponent', () => {
  let component: DocumentOrderServiceComponent;
  let fixture: ComponentFixture<DocumentOrderServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentOrderServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentOrderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
