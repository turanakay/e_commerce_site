import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-managerproductview',
  templateUrl: './managerproductview.component.html',
  styleUrls: ['./managerproductview.component.css']
})
export class ManagerproductviewComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
      //.subscribe(heroes => this.heroes = heroes.slice(0, 2));
  }
  directTo(hero:Hero){
    window.location.href= '/managerproductdetails/'+hero.id;
  }
}
