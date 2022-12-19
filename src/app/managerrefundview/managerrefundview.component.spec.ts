import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerrefundviewComponent } from './managerrefundview.component';

describe('ManagerrefundviewComponent', () => {
  let component: ManagerrefundviewComponent;
  let fixture: ComponentFixture<ManagerrefundviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerrefundviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerrefundviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
