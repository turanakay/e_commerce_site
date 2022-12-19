import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerproductviewComponent } from './managerproductview.component';

describe('ManagerproductviewComponent', () => {
  let component: ManagerproductviewComponent;
  let fixture: ComponentFixture<ManagerproductviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerproductviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerproductviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
