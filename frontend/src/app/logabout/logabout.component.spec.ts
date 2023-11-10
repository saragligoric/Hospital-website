import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogaboutComponent } from './logabout.component';

describe('LogaboutComponent', () => {
  let component: LogaboutComponent;
  let fixture: ComponentFixture<LogaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogaboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
