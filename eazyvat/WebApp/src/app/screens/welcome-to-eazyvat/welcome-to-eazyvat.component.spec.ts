import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToEazyvatComponent } from './welcome-to-eazyvat.component';

describe('WelcomeToEazyvatComponent', () => {
  let component: WelcomeToEazyvatComponent;
  let fixture: ComponentFixture<WelcomeToEazyvatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeToEazyvatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeToEazyvatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
