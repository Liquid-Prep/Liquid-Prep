import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureSoilComponent } from './measure-soil.component';

describe('MeasureSoilComponent', () => {
  let component: MeasureSoilComponent;
  let fixture: ComponentFixture<MeasureSoilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureSoilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureSoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
