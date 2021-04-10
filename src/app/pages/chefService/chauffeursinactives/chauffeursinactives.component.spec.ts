import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeursinactivesComponent } from './chauffeursinactives.component';

describe('ChauffeursinactivesComponent', () => {
  let component: ChauffeursinactivesComponent;
  let fixture: ComponentFixture<ChauffeursinactivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeursinactivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeursinactivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
