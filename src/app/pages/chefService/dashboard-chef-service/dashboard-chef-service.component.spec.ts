import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChefServiceComponent } from './dashboard-chef-service.component';

describe('DashboardChefServiceComponent', () => {
  let component: DashboardChefServiceComponent;
  let fixture: ComponentFixture<DashboardChefServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChefServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChefServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
