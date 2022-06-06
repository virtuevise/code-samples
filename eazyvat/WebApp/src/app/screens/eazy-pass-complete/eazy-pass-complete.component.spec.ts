import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EazyPassCompleteComponent } from './eazy-pass-complete.component';

describe('EazyPassCompleteComponent', () => {
  let component: EazyPassCompleteComponent;
  let fixture: ComponentFixture<EazyPassCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EazyPassCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EazyPassCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
