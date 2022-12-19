import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CartItemToBeDeleted, CartOnline, newCartItem } from './cartonline';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HeroesComponent } from './heroes/heroes.component';
import { waitForAsync } from '@angular/core/testing';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  negeldi!:string;
  negeldi2!:string;
  cartitemid!:number; 
  existingquantity!:number;
  cartItems : Hero[] = [];
  cartItemsOnline! : CartOnline;
  numberOfItems : number = 0;
  PriceSum : number = 0;
  qty : number[] = [];
  constructor(    private http: HttpClient, private heroservice:HeroService) { }
  exists : boolean = false;
  newitem = {
    "user_id": 1,
    "cartItem": {
            "quantity": 1,
            "product": 4
          }
  }
  itemtodeleted = {
    'user_id' : 1,
    'cartItem_id' : 21
  };
  mytoken:string = localStorage.getItem('token') || 'null';
  private heroesUrl = 'https://cs308ecommerceapp.herokuapp.com/api/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
  };

  getItemsLS() 
  { 
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log('getitemsdeki log' + this.cartItems);
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  increaseQty(index:number){
    if(this.cartItems[index].stock > this.qty[index])
    {
      this.qty[index]=this.qty[index] + 1 ;
      localStorage.setItem('qty', JSON.stringify(this.qty));
      this.PriceSum = this.PriceSum + parseInt(this.cartItems[index].price);  
      localStorage.setItem('totalPriceCart',JSON.stringify(this.PriceSum));
      window.location.reload();
    }
  }
  decreaseQty(index:number){
    if(this.qty[index]>1)
    {
      this.qty[index]=this.qty[index] - 1 ;
      localStorage.setItem('qty', JSON.stringify(this.qty));
      this.PriceSum = this.PriceSum - parseInt(this.cartItems[index].price);  
      localStorage.setItem('totalPriceCart',JSON.stringify(this.PriceSum));
      window.location.reload();
    }
  }
  getTotalPriceLS()
  {
    this.PriceSum = JSON.parse(localStorage.getItem('totalPriceCart') || '0');

    return JSON.parse(localStorage.getItem('totalPriceCart') || '0');
    
  }
  getQty(){
    this.qty = JSON.parse(localStorage.getItem('qty') || '[]');

    return JSON.parse(localStorage.getItem('qty') || '[]');
  }
  getNumofItemsLS()
  {
    this.numberOfItems = JSON.parse(localStorage.getItem('numofitemsCart') || '0');

    return JSON.parse(localStorage.getItem('numofitemsCart') || '0');
  }
  removeFromCard(product: Hero)
  {

    this.cartItems.forEach((element,index)=>{
      if(element.id==product.id) {
        this.PriceSum = this.PriceSum - parseInt(product.price)*this.qty[index];
        this.numberOfItems -= 1;
        this.cartItems.splice(index,1);
        this.qty.splice(index,1);

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        localStorage.setItem('qty', JSON.stringify(this.qty));
        localStorage.setItem('numofitemsCart',JSON.stringify(this.numberOfItems));
        localStorage.setItem('totalPriceCart',JSON.stringify(this.PriceSum));
      }
   });
   window.location.reload();
  }
  resetTheCard()
  {
    this.cartItems.forEach((element,index)=>{
        this.PriceSum = this.PriceSum - parseInt(element.price)*this.qty[index];
        this.numberOfItems -= 1;
        this.cartItems.splice(index,1);
        this.qty.splice(index,1);

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        localStorage.setItem('qty', JSON.stringify(this.qty));
        localStorage.setItem('numofitemsCart',JSON.stringify(this.numberOfItems));
        localStorage.setItem('totalPriceCart',JSON.stringify(this.PriceSum));
   });
  }

  addCartOffline(product: Hero)
  {
    this.exists = false;
    // console.log( this.cartItems);
    this.cartItems.forEach((element)=>{
      if(element.id == product.id)
        this.exists = true;
    });
    // console.log(this.exists);
    if(!this.exists)
    {
      this.cartItems.push(product);
      this.qty.push(1);
      this.numberOfItems += 1;
      // console.log('item sayisi');
      // console.log(this.numberOfItems);
      this.PriceSum = this.PriceSum + parseInt(product.price);  
      // console.log('price toplam');
      // console.log(this.PriceSum);
      localStorage.setItem('qty', JSON.stringify(this.qty));
      localStorage.setItem('numofitemsCart',JSON.stringify(this.numberOfItems));
      localStorage.setItem('totalPriceCart',JSON.stringify(this.PriceSum));
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      window.location.reload();
    }
    else
    {
      this.cartItems.forEach((element,index)=>{
        if(element.id==product.id) {
          // console.log(this.qty[index]);
          this.qty[index] = this.qty[index] + 1 ;
          this.PriceSum = this.PriceSum + parseInt(product.price);  
          localStorage.setItem('totalPriceCart',JSON.stringify(this.PriceSum));
          localStorage.setItem('qty',JSON.stringify(this.qty));
        }
     });
     window.location.reload();
    }
    // console.log( this.cartItems);
  }
  decreaseQuantityOnline(productid:number,productStock:number, userid:number,cartid:number)
  {
    this.GetCartOnline(cartid)
    .subscribe(a =>{ 
      this.cartItemsOnline = a
      this.cartItemsOnline.cartItems.forEach((element)=>{
        if(element.product == productid){
          this.cartitemid = element.id
          this.existingquantity = element.quantity;
          if(productStock>this.existingquantity && this.existingquantity-1 > 0 ){
            this.itemtodeleted.cartItem_id = this.cartitemid;
            this.itemtodeleted.user_id = userid;
            this.http.post<any>(`${this.heroesUrl + 'remove-from-cart/'}`,this.itemtodeleted,this.httpOptions).subscribe({
              next: data => {
                  this.negeldi2 = data;

                  //window.location.reload();
              },
              error: error => {
                  this.negeldi = error.message;
                  console.error('There was an error!', error);
              }
          });;
            this.newitem.user_id = userid;
            this.newitem.cartItem.product = productid;
            this.newitem.cartItem.quantity =this.existingquantity-1;
            this.http.post<any>(`${this.heroesUrl + 'add-to-cart/'}`,this.newitem,this.httpOptions).subscribe({
              next: data => {
                  this.negeldi2 = data;

                  window.location.reload();
              },
              error: error => {
                  this.negeldi = error.message;
                  console.error('There was an error!', error);
              }
          });;
            
          }
         
        }
      });
      
    })
  }
  increaseQuantityOnline(productid:number,productStock:number, userid:number,cartid:number)
  {
    this.GetCartOnline(cartid)
    .subscribe(a =>{ 
      this.cartItemsOnline = a
      this.cartItemsOnline.cartItems.forEach((element)=>{ // carttaki her eleman icin
        if(element.product == productid){ //product id ler eslesirse
          this.cartitemid = element.id;  //cartid sini al
          this.existingquantity = element.quantity; //quantitysini al
          if(productStock>this.existingquantity){ //stock yeterliyse
          //   this.itemtodeleted.cartItem_id = this.cartitemid;
          //   console.log('cartitemid ' + this.itemtodeleted.cartItem_id);
          //   this.itemtodeleted.user_id = userid;
          //   console.log('gonderdigim sey ' + this.itemtodeleted);
          //   this.http.post<any>(`${this.heroesUrl + 'remove-from-cart/'}`,this.itemtodeleted,this.httpOptions).subscribe({
          //     next: data => {
          //         this.negeldi2 = data;
          //         console.log(this.negeldi2);
          //         console.log(data);
          //         //window.location.reload();
          //     },
          //     error: error => {
          //         this.negeldi = error.message;
          //         console.error('There was an error!', error);
          //     }
          // });;
            this.newitem.user_id = userid;
            this.newitem.cartItem.product = productid;
            this.newitem.cartItem.quantity =1;
            this.http.post<any>(`${this.heroesUrl + 'add-to-cart/'}`,this.newitem,this.httpOptions).subscribe({
              next: data => {
                  this.negeldi2 = data;
                 // console.log(this.negeldi2);
                 // console.log(data);
                  window.location.reload();
              },
              error: error => {
                  this.negeldi = error.message;
                  console.error('There was an error!', error);
              }
          });;
            //window.location.reload();
          }     
        }
      });
    })
  }
  removeFromCardOnline(userid:number,cartid:number,productid:number){
    this.GetCartOnline(cartid)
    .subscribe(a =>{ 
      this.cartItemsOnline = a
      this.cartItemsOnline.cartItems.forEach((element)=>{
        if(element.product == productid){
          this.itemtodeleted.cartItem_id =element.id
          this.itemtodeleted.user_id = userid;
          this.http.post<any>(`${this.heroesUrl + 'remove-from-cart/'}`,this.itemtodeleted,this.httpOptions).subscribe({
            next: data => {
                this.negeldi2 = data;
                window.location.reload();
            },
            error: error => {
                this.negeldi = error.message;
                console.error('There was an error!', error);
            }
        });
        }
      });
    })
  }
  addCartOnline(productid:number, userid:number){
    
    
    this.newitem.user_id = userid;
    this.newitem.cartItem.product = productid;
    this.newitem.cartItem.quantity =1;
    this.http.post<any>(`${this.heroesUrl + 'add-to-cart/'}`,this.newitem,this.httpOptions).subscribe({
      next: data => {
          this.negeldi2 = data;
          window.location.reload();
      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });;
    // this.GetCartOnline(cartid)
    // .subscribe(a =>{
    //   this.cartItemsOnline = a
    //   this.cartItemsOnline.cartItems.forEach((element)=>{
    //     if(productid == element.product)
    //     {
    //         console.log(productid + 'productimizin idsi');
    //         this.exists = true;
    //         this.itemtodeleted.cartItem_id = element.id;
    //         this.itemtodeleted.user_id = userid; // userid yapilcak
    //         this.existingquantity = element.quantity;
    //         if(productStock>this.existingquantity && this.exists){
    //           console.log('burda patlior');
    //           this.http.post<any>(`${this.heroesUrl + 'remove-from-cart/'}`,this.itemtodeleted,this.httpOptions)
    //           .subscribe({
    //             next: data => {
    //                 this.negeldi2 = data;
    //                 console.log('sildik');
    //                 console.log(data);
                    
    //             },
    //             error: error => {
    //                 this.negeldi = error.message;
    //                 console.error('There was an error!', error);
    //             }
    //         });   
    //         }
    //     }
    //   });
    //   if(!this.exists)
    //   {
    //     if(productStock> 0)
    //     {
    //         console.log('yenide');
            
    //         this.newitem.user_id = userid;
    //         this.newitem.cartItem.product = productid;
    //         this.newitem.cartItem.quantity =1;
    //         console.log(this.newitem.user_id + 'userid')
    //         console.log(this.newitem.cartItem.product + 'productid')
    //         console.log(this.newitem.cartItem.quantity+ 'qty')
    //         this.http.post<any>(`${this.heroesUrl + 'add-to-cart/'}`,this.newitem,this.httpOptions).subscribe({
    //           next: data => {
    //               this.negeldi2 = data;
    //               console.log(this.negeldi2);
    //               console.log(data);
    //               window.location.reload();
    //           },
    //           error: error => {
    //               this.negeldi = error.message;
    //               console.error('There was an error!', error);
    //           }
    //       });;
         
    //     }
    //   }
    //   // }
    //  //window.location.reload();
    // });
    
  }

  GetCartOnline(userid:number)
  {
      this.exists = false;
      // console.log(this.cartItems);
      return this.http.get<CartOnline>(this.heroesUrl + 'view-cart/' + `${userid}`,this.httpOptions)
  }
  getItemsOnline(cartid:number){
    this.GetCartOnline(cartid).subscribe(heroes =>{ 
          this.cartItemsOnline = heroes;
          //console.log(this.cartItemsOnline);
          if(this.cartItemsOnline == null)
          {
            this.numberOfItems =0;
            this.qty = [];
            this.cartItems=[];
            this.PriceSum = 0
          }
          else
          {
            this.cartItemsOnline.cartItems.forEach((element)=>{
              this.numberOfItems +=1;
              this.qty.push(element.quantity);
              this.heroservice.getHero(element.product).subscribe(hero =>{ 
                this.cartItems.push(hero);
                this.PriceSum+= element.quantity*parseInt(hero.price);
              })
            });//userid
          }
      });
  }
}
