import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog2PathComponent } from './dialog-2-path.component';

describe('Dialog2PathComponent', () => {
  let component: Dialog2PathComponent;
  let fixture: ComponentFixture<Dialog2PathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dialog2PathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog2PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
