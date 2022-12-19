import { TestBed } from '@angular/core/testing';
import { CommonModule } from "@angular/common";
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from "../register/register.component";

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
