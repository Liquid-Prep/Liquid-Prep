import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedDateComponent } from './seed-date.component';

describe('SeedDateComponent', () => {
  let component: SeedDateComponent;
  let fixture: ComponentFixture<SeedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
