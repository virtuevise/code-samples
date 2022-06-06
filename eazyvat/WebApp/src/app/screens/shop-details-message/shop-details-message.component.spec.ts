import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetailsMessageComponent } from './shop-details-message.component';

describe('ShopDetailsMessageComponent', () => {
  let component: ShopDetailsMessageComponent;
  let fixture: ComponentFixture<ShopDetailsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopDetailsMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDetailsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
