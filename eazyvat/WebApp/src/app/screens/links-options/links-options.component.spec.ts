import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksOptionsComponent } from './links-options.component';

describe('LinksOptionsComponent', () => {
  let component: LinksOptionsComponent;
  let fixture: ComponentFixture<LinksOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
