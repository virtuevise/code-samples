import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInfoDetailsComponent } from './flight-info-details.component';

describe('FlightInfoDetailsComponent', () => {
  let component: FlightInfoDetailsComponent;
  let fixture: ComponentFixture<FlightInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightInfoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
