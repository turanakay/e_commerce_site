import { Component, OnInit } from '@angular/core';
import { Comment, Commentadmin, Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-managercommentview',
  templateUrl: './managercommentview.component.html',
  styleUrls: ['./managercommentview.component.css']
})
export class ManagercommentviewComponent implements OnInit {

  heroes: Hero[] = [];
  comments:Commentadmin[] = []

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getOrders();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
      //.subscribe(heroes => this.heroes = heroes.slice(0, 2));
  }
  getOrders(): void {
    this.heroService.getcommentsadmin().subscribe(element =>{
      this.comments = element
    })
  }
  directTo(hero:Commentadmin){
    window.location.href= '/managercommentdetails/'+hero.id;
  }

}
