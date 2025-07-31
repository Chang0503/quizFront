import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePathComponent } from './write-path.component';

describe('WritePathComponent', () => {
  let component: WritePathComponent;
  let fixture: ComponentFixture<WritePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritePathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
