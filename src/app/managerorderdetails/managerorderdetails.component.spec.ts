import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerorderdetailsComponent } from './managerorderdetails.component';

describe('ManagerorderdetailsComponent', () => {
  let component: ManagerorderdetailsComponent;
  let fixture: ComponentFixture<ManagerorderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerorderdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
