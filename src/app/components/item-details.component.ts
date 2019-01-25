import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../starwars.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Location } from '@angular/common';

import { Planet } from "../model";
import { People } from "../model";
import { Film } from "../model";
import { Vehicle } from "../model";
import { Starship } from "../model";
import { Species } from "../model";
import { KeysPipe } from "../pipe.transform";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"]
})
export class ItemDetailsComponent implements OnInit {
  subscription: Subscription;
  item: Object;
  itemDetails;
  picture: string;
  category: string;
  title: string

  constructor(private starwarsservice: StarWarsService, router: Router, private _location: Location) {}

  ngOnInit() {
    this.itemDetails = {}
    this.subscription = this.starwarsservice.item$.subscribe(
      item => (this.item = item)
    );
    
    this.starwarsservice.getItemDetails(this.item['category'], this.item['page'], this.item['id']).then(itemdetail => {
        this.itemDetails = itemdetail;
        this.title = itemdetail.name ? itemdetail.name : itemdetail.title
      })
    this.picture = this.starwarsservice.getPicture(this.item['category'], this.item['page'], this.item['id'])
  }

  goBack(){
    this._location.back();
  }
 isIterable = (object) =>
 { 
   return object != null && typeof object !== 'string' && typeof object[Symbol.iterator] === 'function'}
  
}
