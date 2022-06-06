import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberConnectionDetailsComponent } from './member-connection-details.component';

describe('MemberConnectionDetailsComponent', () => {
  let component: MemberConnectionDetailsComponent;
  let fixture: ComponentFixture<MemberConnectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberConnectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
