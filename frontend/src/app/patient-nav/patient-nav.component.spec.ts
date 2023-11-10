import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNavComponent } from './patient-nav.component';

describe('PatientNavComponent', () => {
  let component: PatientNavComponent;
  let fixture: ComponentFixture<PatientNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
