import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugHelper } from 'protractor/built/debugger';
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

  name: string
  subscription: Subscription
  info= [{
    name: 'apple',
    category: 'planets',
    page : '1'
  },
  {
    name: 'banana',
    category: 'planets',
    page : '2'  
  }]
  ngOnInit() {
    this.subscription = this.starwarservice.item$
      .subscribe(item => this.name = item)  
  
    // this.starwarservice.
    //   getCategoryItems(this.name, 1).then((result) => {
    //    this.info.push(result)
    //     for (var key in result) {
    //       console.log(key)
    //       this.info.push(key)
    //     }
    //   });
 }
  constructor(private router: Router,private _location:
    Location, private starwarservice: StarWarsService) {
  }
  goToItemDetails(){
    this.starwarservice.setItemSelected('apple');
    this.router.navigate(['itemDetails']);
  }
}