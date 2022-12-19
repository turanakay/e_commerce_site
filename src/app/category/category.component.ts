import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  term:string = '';
  numofitems : number = 0;

  selectedOption: string = String(this.route.snapshot.paramMap.get('search'));
  selectedOptions: string = 'Popularity Descending';
  constructor(private heroService: HeroService,private route: ActivatedRoute,private location: Location) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    
  }

  ngOnInit(): void {
    this.getHeroesByTerm();
    // console.log('geldik sayfaya');
    // this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.heroService.searchHeroes(term)),
    // );
  }
  
  heroes: Hero[] = [];
  category: Category ={
    id: 0,
    products: [],
  };
  
  getHeroesByTerm(): void {
    this.term = String(this.route.snapshot.paramMap.get('search'));
    // this.heroService.searchHeroes(this.term)
    // .subscribe(heroes => this.heroes = heroes);
    this.heroService.getHeroesCategory(this.term).subscribe((category) =>{
      if(category != null)
      {
        this.getCountCategory(category);
        this.category = category;
        this.sortthis('cat');
      }
      else
        this.heroes = category;
      
    });
    
      //.subscribe(heroes => this.heroes = heroes.slice(0, 2));
  }
  getCount(heroes:Hero[]){
    this.numofitems = heroes.length;
  }
  getCountCategory(category:Category){
    this.numofitems = category.products.length;
  }

  sortthis(option: string){
    // console.log(this.heroes);
    if(this.selectedOptions == 'Price Descending')
      this.insertionSortPriceDescend();
    else if(this.selectedOptions == 'Price Ascending')
      this.insertionSortPriceAscend();
    else if(this.selectedOptions == 'Name Descending')
      this.insertionSortNameDescend();
    else if(this.selectedOptions == 'Name Ascending')
      this.insertionSortNameAscend();
    // else
    //   console.log(this.selectedOption);
    else if(this.selectedOptions == 'Popularity Descending')
      this.insertionSortPopularityDescend();
    else if(this.selectedOptions == 'Popularity Ascending')
      this.insertionSortPopularityAscend();
  }
  insertionSortPriceAscend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.category.products.length;p++)
    {
      let tmp = this.category.products[p];
      for(j=p; j>0 && parseInt(tmp.price) < parseInt(this.category.products[j-1].price) ;j--)
        this.category.products[j] = this.category.products[j-1];
      this.category.products[j] = tmp;
    }
  }
  insertionSortPopularityAscend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.category.products.length;p++)
    {
      let tmp = this.category.products[p];
      for(j=p; j>0 && parseInt(tmp.purchase_count) < parseInt(this.category.products[j-1].purchase_count) ;j--)
        this.category.products[j] = this.category.products[j-1];
      this.category.products[j] = tmp;
    }
  }
  insertionSortPopularityDescend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.category.products.length;p++)
    {
      let tmp = this.category.products[p];
      for(j=p; j>0 && parseInt(tmp.purchase_count) > parseInt(this.category.products[j-1].purchase_count) ;j--)
        this.category.products[j] = this.category.products[j-1];
      this.category.products[j] = tmp;
    }
  }
  insertionSortPriceDescend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.category.products.length;p++)
    {
      let tmp = this.category.products[p];
      for(j=p; j>0 && parseInt(tmp.price) > parseInt(this.category.products[j-1].price) ;j--)
        this.category.products[j] = this.category.products[j-1];
      this.category.products[j] = tmp;
    }
  }
  insertionSortNameDescend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.category.products.length;p++)
    {
      let tmp = this.category.products[p];
      for(j=p; j>0 && tmp.name > this.category.products[j-1].name ;j--)
        this.category.products[j] = this.category.products[j-1];
      this.category.products[j] = tmp;
    }
  }
  insertionSortNameAscend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.category.products.length;p++)
    {
      let tmp = this.category.products[p];
      for(j=p; j>0 && tmp.name < this.category.products[j-1].name ;j--)
        this.category.products[j] = this.category.products[j-1];
      this.category.products[j] = tmp;
    }
  }
  categoricalSearch(value: string){
    this.term = String(this.route.snapshot.paramMap.get('search'));
    if(this.selectedOption == 'All')
    {
      this.heroService.searchHeroes(this.term).subscribe((heroes) =>{
        if(heroes != null)
        {
          this.getCount(heroes);
          this.heroes = heroes;
        }
        else
          this.heroes = heroes;
        
      });
    }
    else
    {
      // // this.heroService.searchHeroes(this.term)
      // // .subscribe(heroes => this.heroes = heroes);
      // this.heroService.getHeroesCategory(this.selectedOption).subscribe((heroes) =>{
      //   if(heroes != null)
      //   {
      //     this.getCount(heroes);
      //     this.heroes = heroes;
      //   }
      //   else
      //     this.heroes = heroes;
        
      // });
    console.log(this.heroes);
    }
  }
}
