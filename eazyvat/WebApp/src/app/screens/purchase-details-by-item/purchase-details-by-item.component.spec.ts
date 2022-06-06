import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailsByItemComponent } from './purchase-details-by-item.component';

describe('PurchaseDetailsByItemComponent', () => {
  let component: PurchaseDetailsByItemComponent;
  let fixture: ComponentFixture<PurchaseDetailsByItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailsByItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDetailsByItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
