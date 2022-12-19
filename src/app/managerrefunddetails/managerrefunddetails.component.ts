import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-managerrefunddetails',
  templateUrl: './managerrefunddetails.component.html',
  styleUrls: ['./managerrefunddetails.component.css']
})
export class ManagerrefunddetailsComponent implements OnInit {

  constructor(  private heroService: HeroService,   private route: ActivatedRoute,  private location: Location) { }
  id:number=0
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  acceptrefund(){
    
  }

}
