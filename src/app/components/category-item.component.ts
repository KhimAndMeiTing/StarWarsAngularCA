import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  //item: string[]=[];
  item: string;
  initName = "category-item works!"

  name = 'category-item'
  subscription: Subscription
  info: any[];


  ngOnInit() {
    this.subscription = this.starwarservice.item$
       .subscribe(item => this.name = item)
    this.starwarservice.
       getCategoryItems(this.name).then((result)=>{
         this.info = result;
       });
  }

  constructor(private router:Router, private _location: 
    Location,private starwarservice: StarWarsService) { 

    
    
  }
  
}
