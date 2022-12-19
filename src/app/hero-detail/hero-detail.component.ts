import { Component, OnInit, Input } from '@angular/core';
import { Hero,Comments,Comment } from '../hero';
import{CartOnline} from '../cartonline'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { CartService } from '../cart.service';
import { AccountService } from '../account/account.service';
import { User, User2 } from '../user';
import { userInfo } from 'node:os';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero; 
  giris : boolean = true;
  cartItemsOnline!: CartOnline;
  categories: string[] = ['Computers','Gaming', 'TVs','','','','','','','','','','','','',''];
  id:number = 1;
  comments:Comments[]=[];
  user:User[]=[];
  userdetails!:User2;
  NumberofRatings: number = 12;
  NumberofComments: number = 11;
  st:string = '';
  cartid:number = 0;
  userid!:number;
  makereview : Comment= 
  {
    "stars": 3,
    "comment": "Fena değil.",
    "user_id": 7,
    "product_id": 3,
    "approval_status": "No"
}
  holder:string = 'You must log in to make a review';
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private cartService : CartService,
    private AccountService : AccountService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
    this.getComments();
    this.getCartID();
    if(this.giris)
    {
      this.holder = 'Please enter your comment here...'
    }
  }
  getCartID(){
    this.userid = JSON.parse(localStorage.getItem('Userid') || '-1');
    console.log(this.userid + 'asdajksdjkladsjkladsjkladsjadklsadsjkl')
    if(this.userid != null && this.userid != -1)
    { this.giris = true;
      this.heroService.getUser(this.userid) // userid gelicek
      .subscribe(heroes => {this.userdetails= heroes;

        console.log(JSON.stringify(heroes.customer.cart).split('"')[2].split(':')[1].split(',')[0]);
        this.st =JSON.stringify(heroes.customer.cart).split('"')[2].split(':')[1].split(',')[0];
        console.log(parseInt(this.st));
        this.cartid =parseInt(this.st);
        this.getCartData();
      });
    }
    else{
      this.giris =false;
      this.getCartData();
    }
  }
  getComments(){
    this.heroService.getComments(this.id).subscribe(a =>{
      this.comments = a;
      this.NumberofComments=this.comments.length;
      this.NumberofRatings= this.comments.length;
      this.comments.forEach((element=>{
      this.AccountService.finduser(element.customer).subscribe(customer =>{
        this.user.push(customer);
      })
      }))
    })
  }
  postReview(stararea:string, commentarea:string){
    console.log(stararea);
    console.log(commentarea);
    if(this.giris)
    {
      this.makereview.stars = parseInt(stararea);
      this.makereview.comment = commentarea
      this.makereview.user_id = this.userid
      this.makereview.product_id = this.id
      console.log(this.makereview.product_id);
      console.log(this.makereview.user_id );
      this.heroService.makecomment(this.makereview)
    }
    else{
    console.log('giris yapiniz')
    }
  }
  getCartData(){  
    if(this.giris)
    {
      this.cartService.getItemsOnline(this.cartid);
    }
    else
    {
      this.cartService.getItemsLS();
      this.cartService.getTotalPriceLS();
      this.cartService.getNumofItemsLS();
      this.cartService.getQty();
    }
  }
  getHero(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  this.heroService.getHero(this.id)
    .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  addToCart(product: Hero) {
    if(this.giris)
    {
      this.cartService.addCartOnline(product.id,this.userid);// 1 user id olucak
    }
    else
    {
      this.cartService.addCartOffline(product);
    }
  }
}