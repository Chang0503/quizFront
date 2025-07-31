import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParkingComponent } from './dialog-parking.component';

describe('DialogParkingComponent', () => {
  let component: DialogParkingComponent;
  let fixture: ComponentFixture<DialogParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogParkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
