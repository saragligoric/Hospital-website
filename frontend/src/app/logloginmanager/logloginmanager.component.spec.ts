import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogloginmanagerComponent } from './logloginmanager.component';

describe('LogloginmanagerComponent', () => {
  let component: LogloginmanagerComponent;
  let fixture: ComponentFixture<LogloginmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogloginmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogloginmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
