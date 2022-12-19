import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { AccountService } from '../account/account.service';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {  Customer, Orderitems,Orders, Phone, User, User2, Userdegisme, Userdegismesifre } from '../user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private heroService: HeroService,private accountservice : AccountService) { }
  user!:User;
  userdegismesifre!:Userdegismesifre;
  userdegisme!:Userdegisme;
  orderscompleted:Orders[]=[];
  ordersnotcompleted:Orders[]=[];
  orders!:Orders;
  orderitems:Orderitems[]=[
  ]
  userid!:number;
  newphone!: Phone;
  cartid:number = 0;
  name:string = '';
  username: string = ''
  phone:string=''
  email:string=''
  ngOnInit(): void {
    this.getOrdersandUser();
  }
  refund(id:number){
    console.log(id)
    this.heroService.makerefund(id)
  }
  getOrdersandUser(): void {
    this.userid = JSON.parse(localStorage.getItem('Userid') || '-1');
    if(this.userid != -1 && this.userid != null)
    {
    console.log('getuser attim');
    this.heroService.getUserprofile(this.userid) // userid gelicek
    .subscribe(heroes => {this.user= heroes;
      console.log(heroes);
      this.userdegisme = heroes.customer;
      this.userdegismesifre = heroes.customer;
      console.log(this.user.customer.name);
      this.cartid = this.user.customer.cart.id;
      this.user.customer.orders.forEach((element)=>{
        if(element.Status == 'Delivered')
        {
          this.orderscompleted.push(element);
        }
        else
        {
          this.ordersnotcompleted.push(element);
        }
      })
    });
  }
    //.subscribe(heroes => this.heroes = heroes.slice(0, 2));
  }
  changeAccountInfo(phonenumber:string){
    //email can be added
    if(phonenumber.length == 10)
    {

      this.userdegisme.phone = phonenumber;
      this.accountservice.changePhone(this.userdegisme,this.userid,this.userdegisme);
    }
  }


  passwordChange(newpass: string, confirmpass: string){
      if(newpass==confirmpass)
      {
        this.userdegismesifre.password= newpass;
          this.accountservice.changePassword(this.userdegismesifre,this.userid,newpass);
      }
      else
      {
        console.log('New password and confirmation password are not matched! Try again.');
      }
  }


  changetabs( idname : string,tabname: string){
    let i,tabcontents,tablinks;
    tablinks = document.getElementsByClassName('nav-link');
    tabcontents = document.getElementsByClassName('tab-pane fade');
    for(i = 0; i < tablinks.length; i++)
    {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
      tablinks[i].setAttribute('aria-selected', 'false');
    }
    for(i = 0; i < tabcontents.length; i++)
    {
      tabcontents[i].className = tabcontents[i].className.replace(' show active', '');
      
    }
    tabcontents = document.getElementsByClassName('tab-pane fade');
    for(i = 0; i < tabcontents.length; i++)
    {
      if(tabcontents[i].id == tabname)
      {
        tabcontents[i].className = tabcontents[i].className.replace(' fade', ' fade show active');
        
      }
    }
    tablinks = document.getElementsByClassName('nav-link');
    for(i = 0; i < tablinks.length; i++)
    {
      if(tablinks[i].id == idname)
      {
        tablinks[i].className = tablinks[i].className.replace('nav-link', 'nav-link active');
        tablinks[i].setAttribute('aria-selected', 'true');
      }

    }

  }

}
