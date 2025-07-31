import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Path1Component } from './path-1.component';

describe('Path1Component', () => {
  let component: Path1Component;
  let fixture: ComponentFixture<Path1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Path1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Path1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
