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
  info: string[]=[];


  ngOnInit() {
    this.subscription = this.starwarservice.item$
       .subscribe(item => this.name = item)
  }

  constructor(private router:Router, private _location: 
    Location,private starwarservice: StarWarsService) { 
    // starwarservice.
    // getCategoryItems(this.item).then((result)=>{
    //   this.info = result;
    // });
    
    
  }
  
}
