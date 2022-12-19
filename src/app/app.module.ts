import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { DragDropModule } from 'primeng/dragdrop';
import {RatingModule} from 'primeng/rating';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ManagerrefundviewComponent } from './managerrefundview/managerrefundview.component';
import { ManagercommentviewComponent } from './managercommentview/managercommentview.component';
import { ManagerproductviewComponent } from './managerproductview/managerproductview.component';
import { ManagerproductdetailsComponent } from './managerproductdetails/managerproductdetails.component';
import { ManagerrefunddetailsComponent } from './managerrefunddetails/managerrefunddetails.component';
import { ManagerorderdetailsComponent } from './managerorderdetails/managerorderdetails.component';
import { ManagercommentdetailsComponent } from './managercommentdetails/managercommentdetails.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RatingModule,

    ReactiveFormsModule,
    

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  exports:[
    ReactiveFormsModule,

  ],
  declarations: [
    HomeComponent,
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,

    LoginComponent,
    RegisterComponent,

    CartComponent,
    ProfileComponent,
    CategoryComponent,
    CheckoutComponent,
    SuccessComponent,
    FailedComponent,
    AdminhomeComponent,
    ManagerrefundviewComponent,
    ManagercommentviewComponent,
    ManagerproductviewComponent,
    ManagerproductdetailsComponent,
    ManagerrefunddetailsComponent,
    ManagerorderdetailsComponent,
    ManagercommentdetailsComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }