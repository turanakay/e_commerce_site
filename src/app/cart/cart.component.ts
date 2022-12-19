import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { CartService } from '../cart.service';
import {CartItem, CartOnline, deneme} from '../cartonline'
import { cartValues, Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { User, User2 } from '../user';

@Component({ 
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  login:boolean = true;
  heroes: Hero[] = [];
  oneHero!: Hero;
  userdetails!:User2;
  sum : number = 0
  userid!:number;
  numberOfElements : number = 0;
  quantity : number[] = [];
  cartItemsOnline!: CartOnline;
  cartitems:CartItem={
    id:0,
    date_added : '',
    product:0,
    cartid:0,
    quantity:0,
  };
  cartitem: CartOnline = {
    id:0,
    cartItems: [this.cartitems,],
    date_initializeed: '',
    completed:false,
    customerid:0,
    transaction_id:'',
  } ;
  st:string = '';
  cartid:number = 0;
  constructor(private cartService: CartService, private heroService: HeroService,) { }
  
  ngOnInit() {
    this.getUser();
  }
  getUser(){
    let numberPattern = /\d+/g;
    this.userid = JSON.parse(localStorage.getItem('Userid') || '-1');
    if(this.userid != null && this.userid != -1)
    {
      this.login = true;
      this.heroService.getUser(this.userid) // userid gelicek
      .subscribe(heroes => {
        this.userdetails = heroes;
        console.log(JSON.stringify(heroes.customer.cart).split('"')[2].split(':')[1].split(',')[0]);
        this.st =JSON.stringify(heroes.customer.cart).split('"')[2].split(':')[1].split(',')[0];
        console.log('adamin cart idsi' +parseInt(this.st));
        this.cartid =parseInt(this.st);
        // st =JSON.stringify(heroes.cart).slice(-8,-2).match(numberPattern)
        this.GetItems(this.cartid);
      });
    }
    else{
      this.login = false;
      this.GetItemsOffline();
    }
  }
  GetItems(cartid:number){

      this.cartService.GetCartOnline(cartid).subscribe(heroes =>{  //cartid
          this.cartItemsOnline = heroes;
          for(let i = 0 ; i < this.cartItemsOnline.cartItems.length; i++){
            this.numberOfElements +=1;
            this.heroService.getHero(this.cartItemsOnline.cartItems[i].product).subscribe(hero =>{ 
              this.heroes.push(hero);
              this.sum+= this.cartItemsOnline.cartItems[i].quantity*parseInt(hero.price);
              this.quantity.push(this.cartItemsOnline.cartItems[i].quantity);
          })
        }
          // this.cartItemsOnline.cartItems.length
          // this.cartItemsOnline.cartItems.forEach((element)=>{
          //   this.numberOfElements +=1;
          //   this.quantity.push(element.quantity);
          //   console.log(element.quantity)
          //   console.log(element.)
          //   this.heroService.getHero(element.product).subscribe(hero =>{ 
          //     this.heroes.push(hero);
          //     this.sum+= element.quantity*parseInt(hero.price);
          //   })
          // });//cartid
      });
  }
  GetItemsOffline(){
      this.heroes =  this.cartService.getItemsLS();
      this.sum = this.cartService.getTotalPriceLS();
      this.numberOfElements = this.cartService.getNumofItemsLS();
      this.quantity = this.cartService.getQty();
  }
  increaseItem(index : number,hero:Hero){
    if(this.login)
      this.increaseItemOnline(hero);
    else
      this.cartService.increaseQty(index);
  }
  decreaseItem(index: number,hero:Hero){
    if(this.login)
      this.decreaseItemOnline(hero);
    else
      this.cartService.decreaseQty(index);
  }
  deleteitem(product: Hero)
  {
    if(this.login)
    {
      this.deleteitemOnline(product);
    }
    else
      this.cartService.removeFromCard(product);
  }
  increaseItemOnline(hero:Hero){
    this.cartService.increaseQuantityOnline(hero.id,hero.stock,this.userid,this.cartid);///////////bu 3 fonksiyondaki 1 ler userid olucak
  }
  decreaseItemOnline(hero:Hero){
    this.cartService.decreaseQuantityOnline(hero.id,hero.stock,this.userid,this.cartid);
  }
  deleteitemOnline(hero:Hero)
  {
    this.cartService.removeFromCardOnline(this.userid,this.cartid,hero.id);
  }
  goToCheckout(){
    if(this.login)
    {
      if(this.numberOfElements>0)
      window.location.href = "/checkout";
    }
    else{
      window.location.href = "/login";
    }
    
  }
}
