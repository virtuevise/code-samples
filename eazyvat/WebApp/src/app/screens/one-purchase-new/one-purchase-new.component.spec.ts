import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePurchaseNewComponent } from './one-purchase-new.component';

describe('OnePurchaseNewComponent', () => {
  let component: OnePurchaseNewComponent;
  let fixture: ComponentFixture<OnePurchaseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePurchaseNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePurchaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
