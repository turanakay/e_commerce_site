import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerproductdetailsComponent } from './managerproductdetails.component';

describe('ManagerproductdetailsComponent', () => {
  let component: ManagerproductdetailsComponent;
  let fixture: ComponentFixture<ManagerproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerproductdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
