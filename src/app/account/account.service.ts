import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs';

import { Router } from '@angular/router'
import { Password, Phone, User, User2, Userdegisme, Userdegismesifre, Userlogin } from "../user";
import { BehaviorSubject} from 'rxjs';
import { map} from 'rxjs/operators';



@Injectable({ providedIn: 'root' })

export class AccountService {

  private heroesUrl = 'https://cs308ecommerceapp.herokuapp.com/api/';

  private currentUserSource = new BehaviorSubject<User | null >(null);
  currentUser$ = this.currentUserSource.asObservable();
  pass!:Password;
  negeldi!:string;
  negeldi2!:User;
  constructor(private http: HttpClient, private router: Router) {} 
  mytoken:string = localStorage.getItem('token') || 'null';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
  };
   
    // let headers = new HttpHeaders({
    //  'Content-Type': 'application/json'
    // });
    // let httpOptions = {};
    //  headers.set('Authorization', `Bearer ${token}`);
    //  httpOptions = { headers }
    // else{
    //   let headers = new HttpHeaders();
    //   headers = headers.set('Authorization', 'Token ad3b5fc2de49494a0bbdbe378ade03708d7e52aa');
    //   console.log('token var');
    // return this.http.get<User2>(this.heroesUrl + 'user-detail/'+7,{ headers }).pipe(
    //   map((user : User2) => {
    //     if (user ) {
    //       localStorage.getItem(JSON.stringify(user));
    //       console.log('tokenim var mı anlamadım');
    //       this.currentUserSource.next(user.customer);
    //       console.log('asdfasdfas');
    //       localStorage.setItem('User', JSON.stringify(user.customer.id))
    //       console.log('tokken',user.customer.id);
    //       console.log(user);
    //     }
    //   })
    // );
    // }
  

  login(values: any){
    return this.http.post<Userlogin>('https://cs308ecommerceapp.herokuapp.com/api/'+'user-login/', values,this.httpOptions).pipe(
      map((user : Userlogin)=>{
        if(user){
          localStorage.setItem('token', user.token)
          localStorage.setItem('customer',JSON.stringify(user.user.customer));
          localStorage.setItem('Userid', JSON.stringify(user.user.id))
          localStorage.setItem('User', JSON.stringify(user.user))
          localStorage.setItem('Username', JSON.stringify(user.user.username))
          this.currentUserSource.next(user.user);
          window.location.href='/home'
        }
      })
    )
  }
  changePhone(user:Userdegisme,userid:number,numbernewphone:Phone){
    this.http.post<Password>(this.heroesUrl+'user-update/' + userid + '/', user, this.httpOptions).subscribe({
      next: data => {
          this.pass = data;
          window.location.reload();
      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  changePassword(user:Userdegismesifre,userid:number,newpass:string){
    this.http.post<Password>(this.heroesUrl+'user-update/' + userid +'/',user, this.httpOptions).subscribe({
      next: data => {
          this.pass = data;
          //window.location.reload();
      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  register(values:any){
    return this.http.post<User>(this.heroesUrl+'user-create/',values ).pipe(
      map((user: User)=>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          
        }
      })
    )
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('Userid');
    localStorage.removeItem('User');
    localStorage.removeItem('Username');
    this.currentUserSource.next(null);
    window.location.href='/home'
  }
  finduser(id:number){
    return this.http.get<User> (this.heroesUrl + 'customer-detail/' + id);

  }
}