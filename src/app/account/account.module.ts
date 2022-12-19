import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AppRoutingModule
  ]
})
export class AccountModule { }
