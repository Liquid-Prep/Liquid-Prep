import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingDialogComponent } from './connecting-dialog.component';

describe('ConnectingDialogComponent', () => {
  let component: ConnectingDialogComponent;
  let fixture: ComponentFixture<ConnectingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
