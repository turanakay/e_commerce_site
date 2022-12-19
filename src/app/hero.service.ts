import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Comments, Description, Hero, Name, Price, Stock,Comment, Commentadmin } from './hero';
import {Category} from './category'
import { MessageService } from './message.service';
import { Orders, User, User2 } from './user';


@Injectable({ providedIn: 'root' })
export class HeroService {
  
  private heroesUrl = 'https://cs308ecommerceapp.herokuapp.com/api/';  // URL to web api
  mytoken:string = localStorage.getItem('token') || 'null';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
  };
  herotemp!:Hero;
  negeldi!:String;
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  checkout(id:number,myform:any){
    return this.http.post<any>(this.heroesUrl + 'user-checkout/' + id + '/', myform,this.httpOptions)
  }
  makerefund(id:number){
    return this.http.get<any>(this.heroesUrl + 'make-refund/' + id + '/',this.httpOptions)
  }
  refundaccept(id:number){
    return this.http.post<any>(this.heroesUrl + 'request-refund/' + id +'/',this.httpOptions).subscribe({
      next: data => {
          this.herotemp = data;

      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  orderUpdate(id:number,status:any){
    // console.log(id)
    // console.log(status)
    return this.http.post<any>(this.heroesUrl + 'order-update/' + id +'/',this.httpOptions).subscribe({
      next: data => {
          this.herotemp = data;

      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  getreviewaccept(id:number)
  {
    return this.http.get<Commentadmin>(this.heroesUrl + 'review-approval/' + id,this.httpOptions).subscribe({
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  getcommentsadmin()
  {
    return this.http.get<Commentadmin[]>(this.heroesUrl + 'review-list/',this.httpOptions)
  }
  getOrderDetails(id:number){
    return this.http.get<Orders>(this.heroesUrl + 'order-detail/' + id,this.httpOptions)
  }
  getOrdersrefund(){
    return this.http.get<Orders[]>(this.heroesUrl + 'refund-list/',this.httpOptions)
  }
  getOrdersrefunddetail(id:number){
    return this.http.get<Orders[]>(this.heroesUrl + 'refund-list/',this.httpOptions)
  }
  getOrders(){
    return this.http.get<Orders[]>(this.heroesUrl + 'order-list/',this.httpOptions)
  }
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl + 'product-list/')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  getHeroesCategory(term:string): Observable<Category> {
    return this.http.get<Category>(this.heroesUrl + 'products/' +term)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Category>('getHeroes', undefined))
      );
  }
  makecomment(review: Comment){
	return this.http.post<any>(this.heroesUrl+ 'make-review/',review,this.httpOptions).subscribe({
    next: data => {
        this.negeldi = data;
        window.location.reload()
    },
    error: error => {
        this.negeldi = error.message;
        console.error('There was an error!', error);
    }
  });
}
  
  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> { 
    
    const url = `${this.heroesUrl + 'product-detail'}/${id}`;
    // console.log(id);
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  getComments(id:number){
    const url = `${this.heroesUrl + 'product-reviews'}/${id}`;
    return this.http.get<Comments[]>(url)
  }
  getHeroAndUse(id: number): Observable<Hero> { 
    
    const url = `${this.heroesUrl + 'product-detail'}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl + 'product'}/search=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  //////// Save methods //////////
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  updateHeroName(hero: Name,id:number){
    return this.http.post<Hero>(`${this.heroesUrl + 'product-update/' +id+ '/'}`,hero).subscribe({
      next: data => {
          this.herotemp = data;
      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  updateHeroPrice(hero: Price,id:number){
    return this.http.post<any>(`${this.heroesUrl + 'product-update/' +id + '/'}`,hero).subscribe({
      next: data => {
          this.herotemp = data;

      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  updateHeroDesc(hero: Description,id:number){
    return this.http.post<any>(`${this.heroesUrl + 'product-update/' +id+ '/'}`,hero).subscribe({
      next: data => {
          this.herotemp = data;

      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  updateHeroStock(hero: Stock,id:number){
    return this.http.post<any>(`${this.heroesUrl + 'product-update/' +id+ '/'}`,hero).subscribe({
      next: data => {
          this.herotemp = data;

      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  getUser(id:number)
   {
    //  let user : User ={

  //   email:'string',
  //   cart:{
  //     id: 0,
  //     cartItems:[],
  //     date_initializeed:'string',
  //     completed:false,
  //     transaction_id :'string',
  //     customerid:0  
  //   },
  //   orders:[],
  //   name:'',
  //   username: 'string',
  //   password: 'string',
  //   phone:'string',
  //   id: 0,
  //   date_created:'string',
  //   token: 'string',

  // }
  return this.http.get<User2>(this.heroesUrl + 'user-detail/' +id,this.httpOptions);
  }
  getUserprofile(id:number)
   {
    //  let user : User ={

  //   email:'string',
  //   cart:{
  //     id: 0,
  //     cartItems:[],
  //     date_initializeed:'string',
  //     completed:false,
  //     transaction_id :'string',
  //     customerid:0  
  //   },
  //   orders:[],
  //   name:'',
  //   username: 'string',
  //   password: 'string',
  //   phone:'string',
  //   id: 0,
  //   date_created:'string',
  //   token: 'string',

  // }
  return this.http.get<User>(this.heroesUrl + 'user-detail/' +id,this.httpOptions);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}