import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { CartService } from './cart.service';

import { Hero } from './hero';
import { CartOnline } from './cartonline';
import { HeroService } from './hero.service';
import { Customer, User, User2,Userlogin } from './user';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  login:boolean= true;
  currentUser$! :Observable<User  | null>;
  heroes$!: Observable<Hero[]>;
  itemInCart : number = 0;
  sumprice : number = 0;
  cartItemsOnline!: CartOnline;
  private searchTerms = new Subject<string>();
  st:string = '';
  cartid:number = 0;
  userid!:number;
  username!:string;
  customer!: Observable<Customer[]>;
 
  // userdetails! : User2;
  constructor(private heroService: HeroService, private cartService: CartService,private router: Router,private accountService : AccountService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  searchButton(term: string): void {

    if(term != '')
    window.location.href = "/searchproduct/"+term
    // this.router.navigateByUrl("/searchproduct/"+term);
    
  }
  categoricalSearch(value: string){
    

    // // this.heroService.searchHeroes(this.term)
    // // .subscribe(heroes => this.heroes = heroes);
    window.location.href = "/searchproduct/"+value
    this.heroService.getHeroesCategory(value).subscribe((heroes) =>{
      if(heroes != null)
      {
        // this.getCount(heroes);
        // this.heroes = heroes;
      }
        // this.heroes = heroes;
        
    });
    // console.log(this.heroes);
    
  }
  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem('customer') || 'null');
    this.username = localStorage.getItem('Username') || '-1';
    this.userid = JSON.parse(localStorage.getItem('Userid') || '-1');
    if(this.userid != null && this.userid != -1){
      this.login= true;
    }
    else{
      this.login = false;
    }
    if(this.login)
    {
      this.heroService.getUser(this.userid) // userid gelicek
    .subscribe(heroes => {
      // this.userdetails= heroes;
      // console.log(JSON.stringify(heroes.customer.cart).split('"')[2].split(':')[1].split(',')[0]);
      this.st =JSON.stringify(heroes.customer.cart).split('"')[2].split(':')[1].split(',')[0];
      // console.log(parseInt(this.st));
      this.cartid =parseInt(this.st);
      this.cartService.GetCartOnline(this.cartid).subscribe(heroes =>{  //cartid
        this.cartItemsOnline = heroes;
        // console.log(this.cartItemsOnline.id + 'getcartonlinedan sonra gelen cartitemsonline')
        this.cartItemsOnline.cartItems.forEach((element)=>{
          // console.log(element.product);
          this.itemInCart +=1;
          this.heroService.getHero(element.product).subscribe(hero =>{ 
            this.sumprice+= element.quantity*parseInt(hero.price);
          })
        });//cartid
    });
    });
      
    }
    else{
      this.sumprice = this.cartService.getTotalPriceLS();
      this.itemInCart = this.cartService.getNumofItemsLS();
    }
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

  }
  logout(){
    this.accountService.logout();
  }
  
  
  
  title = 'project';
}
