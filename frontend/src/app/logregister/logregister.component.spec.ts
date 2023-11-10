import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogregisterComponent } from './logregister.component';

describe('LogregisterComponent', () => {
  let component: LogregisterComponent;
  let fixture: ComponentFixture<LogregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
