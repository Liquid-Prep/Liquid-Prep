import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCropsComponent } from './my-crops.component';

describe('MyCropsComponent', () => {
  let component: MyCropsComponent;
  let fixture: ComponentFixture<MyCropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
