import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParkingFindComponent } from './dialog-parking-find.component';

describe('DialogParkingFindComponent', () => {
  let component: DialogParkingFindComponent;
  let fixture: ComponentFixture<DialogParkingFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogParkingFindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogParkingFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
