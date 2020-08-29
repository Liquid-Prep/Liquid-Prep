import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCropComponent } from './select-crop.component';

describe('SelectCropComponent', () => {
  let component: SelectCropComponent;
  let fixture: ComponentFixture<SelectCropComponent>;

  beforeEach(async(() => {
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
