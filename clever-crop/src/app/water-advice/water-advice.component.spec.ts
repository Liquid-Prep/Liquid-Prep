import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAdviceComponent } from './water-advice.component';

describe('WaterGuideComponent', () => {
  let component: WaterAdviceComponent;
  let fixture: ComponentFixture<WaterAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterAdviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
