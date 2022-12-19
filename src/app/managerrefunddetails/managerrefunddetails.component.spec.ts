import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerrefunddetailsComponent } from './managerrefunddetails.component';

describe('ManagerrefunddetailsComponent', () => {
  let component: ManagerrefunddetailsComponent;
  let fixture: ComponentFixture<ManagerrefunddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerrefunddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerrefunddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
