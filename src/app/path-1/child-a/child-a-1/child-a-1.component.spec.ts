import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildA1Component } from './child-a-1.component';

describe('ChildA1Component', () => {
  let component: ChildA1Component;
  let fixture: ComponentFixture<ChildA1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildA1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
