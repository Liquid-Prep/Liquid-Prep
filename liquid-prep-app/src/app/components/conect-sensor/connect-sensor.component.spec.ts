import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSensorComponent } from './connect-sensor.component';

describe('ConnectSensorComponent', () => {
  let component: ConnectSensorComponent;
  let fixture: ComponentFixture<ConnectSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
