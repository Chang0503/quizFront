import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApitestComponent } from './apitest.component';

describe('ApitestComponent', () => {
  let component: ApitestComponent;
  let fixture: ComponentFixture<ApitestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApitestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApitestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
