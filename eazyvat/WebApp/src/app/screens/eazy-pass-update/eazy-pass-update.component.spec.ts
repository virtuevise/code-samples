import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EazyPassUpdateComponent } from './eazy-pass-update.component';

describe('EazyPassUpdateComponent', () => {
  let component: EazyPassUpdateComponent;
  let fixture: ComponentFixture<EazyPassUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EazyPassUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EazyPassUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
