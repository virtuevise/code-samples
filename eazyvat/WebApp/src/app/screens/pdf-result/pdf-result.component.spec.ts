import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfResultComponent } from './pdf-result.component';

describe('PdfResultComponent', () => {
  let component: PdfResultComponent;
  let fixture: ComponentFixture<PdfResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
