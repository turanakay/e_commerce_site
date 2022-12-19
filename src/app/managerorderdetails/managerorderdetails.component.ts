import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as e from 'cors';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-managerorderdetails',
  templateUrl: './managerorderdetails.component.html',
  styleUrls: ['./managerorderdetails.component.css']
})
export class ManagerorderdetailsComponent implements OnInit {

  constructor( private heroService: HeroService, private route: ActivatedRoute,  private location: Location) { }
  selectedOption!: string;
  printedOption!: string;
  selectedValue = 0;
  id:number=0;
  valuecat:string= ''
  date:string = ''
  transactionid:string=''
  status:string = ''
  ngOnInit(): void {
    this.selectedValue = 20;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrderDetail();
  }
  selectedLevel= {
    id:0,
    name: ''
  };
  data = [
      {id: 0, name: "name1"},
      {id: 1, name: "name2"}
  ];

  selected(){
    console.log(this.selectedLevel)
  }
  getOrderDetail(){
    console.log('burdaymm')
    this.heroService.getOrderDetails(this.id).subscribe(element => {7
      console.log(element.transaction_id)
     this.valuecat = element.Status
     this.transactionid = element.transaction_id
     this.date = element.date_ordered
     this.status = element.Status
    })
  }

  options = [
    { name: "Processing", value: 1 },
    { name: "In-transit", value: 2 },
    { name: "Delivered", value: 3 },
  ]
  printas(){
    console.log(this.selectedValue)
  }
  updateStatus(status:string){
    console.log(status)
    let mystatus = {
      "status" : status
    }
    this.heroService.orderUpdate(this.id, mystatus)
  }
}
