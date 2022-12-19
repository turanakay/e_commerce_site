import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Orders } from '../user';
@Component({
  selector: 'app-managerrefundview',
  templateUrl: './managerrefundview.component.html',
  styleUrls: ['./managerrefundview.component.css']
})
export class ManagerrefundviewComponent implements OnInit {

  heroes: Hero[] = [];
  orders: Orders[]=[];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
      //.subscribe(heroes => this.heroes = heroes.slice(0, 2));
  }
  getOrders(): void {
    this.heroService.getOrdersrefund().subscribe(element =>{
      this.orders = element
      console.log(element)
      console.log('asdasd')
      console.log(this.orders)
    })
  }
  directTo(hero:Orders){
    window.location.href= '/managerrefunddetails/'+hero.id;
  }
}
