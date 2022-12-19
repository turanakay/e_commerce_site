import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-managercommentdetails',
  templateUrl: './managercommentdetails.component.html',
  styleUrls: ['./managercommentdetails.component.css']
})
export class ManagercommentdetailsComponent implements OnInit {

  constructor(  private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }
  id:number=0
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  approve(){
    console.log('girdim')
    console.log(this.id)
    this.heroService.getreviewaccept(this.id);
  }
}
