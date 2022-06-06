import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPassportComponent } from './scan-passport.component';

describe('ScanPassportComponent', () => {
  let component: ScanPassportComponent;
  let fixture: ComponentFixture<ScanPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanPassportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
