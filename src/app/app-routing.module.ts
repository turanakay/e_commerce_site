import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SeventsComponent } from './sevents/sevents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CartComponent} from  './cart/cart.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { AccountModule } from "./account/account.module";
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ManagercommentviewComponent } from './managercommentview/managercommentview.component';
import { ManagerproductviewComponent } from './managerproductview/managerproductview.component';
import { ManagerrefundviewComponent } from './managerrefundview/managerrefundview.component';
import { ManagerrefunddetailsComponent } from './managerrefunddetails/managerrefunddetails.component';
import { ManagerorderdetailsComponent } from './managerorderdetails/managerorderdetails.component';
import { ManagerproductdetailsComponent } from './managerproductdetails/managerproductdetails.component';
import { ManagercommentdetailsComponent } from './managercommentdetails/managercommentdetails.component';

const routes: Routes = [
  { 
    path: 'dashboard',
     component: DashboardComponent
  },
  { 
    path: 'managercommentview',
     component:ManagercommentviewComponent
  },
  { 
    path: 'managerproductview',
     component: ManagerproductviewComponent
  },
  { 
    path: 'managerrefundview',
     component: ManagerrefundviewComponent
  },
  { 
    path: 'adminhome',
     component: AdminhomeComponent
  },
  { 
    path: 'failed/:id',
     component: FailedComponent
  },
  { 
    path: 'managerproductdetails/:id',
     component: ManagerproductdetailsComponent
  },
  { 
    path: 'managerorderdetails/:id',
     component: ManagerorderdetailsComponent
  },
  { 
    path: 'managerrefunddetails/:id',
     component: ManagerrefunddetailsComponent
  },
  { 
    path: 'managercommentdetails/:id',
     component: ManagercommentdetailsComponent
  },
  {
    path: 'success',
    component:SuccessComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  { 
    path: 'detail/:id',
     component: HeroDetailComponent 
  },
  { 
    path: 'searchproduct/:search',
     component: HeroSearchComponent 
  },
  { 
    path: 'category/:search',
     component: CategoryComponent
  },
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'special',
    component: SeventsComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'sevents',
    component: SeventsComponent
  },

  {path:'account',loadChildren:() => import('./account/account.module').then(mod=>mod.AccountModule),data:{ breadcrumb: {skip: true}} },

  {
    path: 'cart',
    component: CartComponent
  },
  {
    path : 'profile',
    component: ProfileComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
