import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportErrorMessageComponent } from './passport-error-message.component';

describe('PassportErrorMessageComponent', () => {
  let component: PassportErrorMessageComponent;
  let fixture: ComponentFixture<PassportErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
