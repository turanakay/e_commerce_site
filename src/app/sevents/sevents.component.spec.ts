import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventsComponent } from './sevents.component';

describe('SeventsComponent', () => {
  let component: SeventsComponent;
  let fixture: ComponentFixture<SeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
