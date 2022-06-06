import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePurchaseComponent } from './one-purchase.component';

describe('OnePurchaseComponent', () => {
  let component: OnePurchaseComponent;
  let fixture: ComponentFixture<OnePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
