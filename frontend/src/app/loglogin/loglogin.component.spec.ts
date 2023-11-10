import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogloginComponent } from './loglogin.component';

describe('LogloginComponent', () => {
  let component: LogloginComponent;
  let fixture: ComponentFixture<LogloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
