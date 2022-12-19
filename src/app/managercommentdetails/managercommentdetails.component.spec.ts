import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagercommentdetailsComponent } from './managercommentdetails.component';

describe('ManagercommentdetailsComponent', () => {
  let component: ManagercommentdetailsComponent;
  let fixture: ComponentFixture<ManagercommentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagercommentdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagercommentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
