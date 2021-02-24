import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthStageComponent } from './growth-stage.component';

describe('GrowthStageComponent', () => {
  let component: GrowthStageComponent;
  let fixture: ComponentFixture<GrowthStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
