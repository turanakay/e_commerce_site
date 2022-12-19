import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedOption: string = 'Popularity Descending';
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  sortthis(){
    // console.log(this.selectedOption);
    // console.log(this.heroes);
    if(this.selectedOption == 'Price Descending')
      this.insertionSortPriceDescend();
    else if(this.selectedOption == 'Price Ascending')
      this.insertionSortPriceAscend();
    else if(this.selectedOption == 'Name Descending')
      this.insertionSortNameDescend();
    else if(this.selectedOption == 'Name Ascending')
      this.insertionSortNameAscend();
    // else
    //   console.log(this.selectedOption);
    else if(this.selectedOption == 'Popularity Descending')
      this.insertionSortPopularityDescend();
    else if(this.selectedOption == 'Popularity Ascending')
      this.insertionSortPopularityAscend();
  }
  insertionSortPriceAscend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.heroes.length;p++)
    {
      let tmp = this.heroes[p];
      for(j=p; j>0 && parseInt(tmp.price) < parseInt(this.heroes[j-1].price) ;j--)
        this.heroes[j] = this.heroes[j-1];
      this.heroes[j] = tmp;
    }
  }
  insertionSortPriceDescend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.heroes.length;p++)
    {
      let tmp = this.heroes[p];
      for(j=p; j>0 && parseInt(tmp.price) > parseInt(this.heroes[j-1].price) ;j--)
        this.heroes[j] = this.heroes[j-1];
      this.heroes[j] = tmp;
    }
  }
  insertionSortPopularityAscend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.heroes.length;p++)
    {
      let tmp = this.heroes[p];
      for(j=p; j>0 && parseInt(tmp.purchase_count) < parseInt(this.heroes[j-1].purchase_count) ;j--)
        this.heroes[j] = this.heroes[j-1];
      this.heroes[j] = tmp;
    }
  }
  insertionSortPopularityDescend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.heroes.length;p++)
    {
      let tmp = this.heroes[p];
      for(j=p; j>0 && parseInt(tmp.purchase_count) > parseInt(this.heroes[j-1].purchase_count) ;j--)
        this.heroes[j] = this.heroes[j-1];
      this.heroes[j] = tmp;
    }
  }
  insertionSortNameDescend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.heroes.length;p++)
    {
      let tmp = this.heroes[p];
      for(j=p; j>0 && tmp.name > this.heroes[j-1].name ;j--)
        this.heroes[j] = this.heroes[j-1];
      this.heroes[j] = tmp;
    }
  }
  insertionSortNameAscend() /////// O(N^2) best case if array sorted O(n)
  {
    let j;
    for(let p =1; p<this.heroes.length;p++)
    {
      let tmp = this.heroes[p];
      for(j=p; j>0 && tmp.name < this.heroes[j-1].name ;j--)
        this.heroes[j] = this.heroes[j-1];
      this.heroes[j] = tmp;
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes =>{ 
      this.heroes = heroes.slice(0,25)
      this.sortthis()
    });
      //.subscribe(heroes => this.heroes = heroes.slice(0, 2));
  }

}