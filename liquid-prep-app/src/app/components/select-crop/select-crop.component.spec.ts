import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectCropComponent } from './select-crop.component';

describe('SelectCropComponent', () => {
  let component: SelectCropComponent;
  let fixture: ComponentFixture<SelectCropComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
