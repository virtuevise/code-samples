import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVATRefundComponent } from './no-vat-refund.component';

describe('NoVATRefundComponent', () => {
  let component: NoVATRefundComponent;
  let fixture: ComponentFixture<NoVATRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoVATRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVATRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
