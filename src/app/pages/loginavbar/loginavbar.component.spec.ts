import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginavbarComponent } from './loginavbar.component';

describe('LoginavbarComponent', () => {
  let component: LoginavbarComponent;
  let fixture: ComponentFixture<LoginavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
