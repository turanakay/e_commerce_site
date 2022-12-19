import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Orders } from '../user';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  heroes: Hero[] = [];
  orders: Orders[]=[]
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getOrders().subscribe(element =>{
      this.orders = element
      console.log(element)
      console.log('asdasd')
      console.log(this.orders)
    })
  }
  directTo(hero:Orders){
    window.location.href= '/managerorderdetails/'+hero.id;
  }
}
