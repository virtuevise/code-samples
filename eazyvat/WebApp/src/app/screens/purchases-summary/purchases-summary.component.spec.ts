import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesSummaryComponent } from './purchases-summary.component';

describe('PurchasesSummaryComponent', () => {
  let component: PurchasesSummaryComponent;
  let fixture: ComponentFixture<PurchasesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
