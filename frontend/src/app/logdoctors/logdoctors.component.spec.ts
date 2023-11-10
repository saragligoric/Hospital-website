import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdoctorsComponent } from './logdoctors.component';

describe('LogdoctorsComponent', () => {
  let component: LogdoctorsComponent;
  let fixture: ComponentFixture<LogdoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogdoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
