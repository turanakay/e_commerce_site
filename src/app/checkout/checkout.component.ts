import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { CartService } from '../cart.service';

import { cartValues, Hero } from '../hero';
import{CartOnline} from '../cartonline';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  currenthero!: Hero;
  heroes: Hero[] = [];
  sum : number = 0
  numberOfElements : number = 0;
  quantity : number[] = [];
  checkoutform!: FormGroup;
  outofstock : boolean= false;
  newstocks:number[] = [];
  constructor(private cartService: CartService, private heroService : HeroService ) {}
  signedIn: boolean = true;
  cartItemsOnline!: CartOnline;
  userid:number=0
  checkout={
    "city": "asd",
    "district": "qwe",
    "full_address": "zxc"
  }
  ngOnInit(): void {
    this.createLoginForm();
    this.GetItems();
    this.userid = JSON.parse(localStorage.getItem('Userid') || '-1');
  }
  GetItems(){
    if(this.signedIn)
    {
      this.cartService.GetCartOnline(1).subscribe(heroes =>{  //userid
          this.cartItemsOnline = heroes;
          this.cartItemsOnline.cartItems.forEach((element)=>{
            this.numberOfElements +=1;
            this.quantity.push(element.quantity);
            this.heroService.getHero(element.product).subscribe(hero =>{ 
              this.heroes.push(hero);
              this.sum+= element.quantity*parseInt(hero.price);
            })
          });//userid
      });
    }
    else{
      this.heroes =  this.cartService.getItemsLS();
      this.sum = this.cartService.getTotalPriceLS();
      this.numberOfElements = this.cartService.getNumofItemsLS();
      this.quantity = this.cartService.getQty();
    }

  }
  createLoginForm() {
    this.checkoutform = new FormGroup({
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      nameoncard: new FormControl(null, [Validators.required]),
      cardnumber: new FormControl(null, Validators.required),
      expmonth: new FormControl(null, Validators.required),
      expyear: new FormControl(null, Validators.required),
      cvv: new FormControl(null, Validators.required),
    })
  }
  getHero(id: number,index:number): void {
    // console.log(id);
    this.heroService.getHero(id)
      .subscribe(hero =>{ 
        this.currenthero = hero;
        this.storeHero(this.currenthero,index);
      
      });
  }
  storeHero(hero:Hero,index:number){
    console.log(hero.stock);
    console.log(this.quantity[index]);
    if(hero.stock < this.quantity[index])
    {
      console.log('stock o kadar yok');
      this.outofstock = true;
      window.location.href = "/failed/" + hero.name;
    }
    else
    {
      this.newstocks.push(hero.stock-this.quantity[index]);
    }
    if(this.outofstock == true)
    {
      console.log('outofstock');
      
    }
    else if((index == (this.numberOfElements-1))) 
    {
      // hesabin orderlarina ekle
      //this.DecreaseStock();// eror cikarsa bundandir gerisi calisiyor/////////////////////////////////////////
      this.clearCart();
      window.location.href = "/success";
    }

  }
  clearCart(){
    if(this.signedIn)
    {
        //clear the server cart
    }
    else
    {
      localStorage.clear();
    }
  }
  onSubmit() {

    // devamsa stocklari dusur ve hesabin orderlarina ekle 
    if(this.checkoutform.invalid.valueOf())
      console.log('erorvar');
    else
    { ///// city  fulldistrict_address customer
      this.checkout.city = this.checkoutform.value.city
      this.checkout.district = this.checkoutform.value.state
      this.checkout.full_address  = this.checkoutform.value.address
      console.log(this.checkout);
      this.heroService.checkout(this.userid,this.checkout).subscribe(()=>{
         window.location.href = "/success";
      })
      // window.location.href = "/success";
    }

  }
  DecreaseStock(){
    for(let i = 0; i >this.numberOfElements;i++)
    { 
      //this.heroService.updateHeroStock(this.heroes[i],this.newstocks[i]);
      //put in orderlist in server
      
    }
  }
}
