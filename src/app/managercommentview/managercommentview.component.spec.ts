import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagercommentviewComponent } from './managercommentview.component';

describe('ManagercommentviewComponent', () => {
  let component: ManagercommentviewComponent;
  let fixture: ComponentFixture<ManagercommentviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagercommentviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagercommentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
