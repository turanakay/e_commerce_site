import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {
  faileditem: string = String(this.route.snapshot.paramMap.get('id'));
  constructor(    
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
  }
  return(){
    window.location.href = "/cart";
  }
}
