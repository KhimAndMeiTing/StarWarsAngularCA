import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../starwars.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Location } from '@angular/common';

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"]
})
export class ItemDetailsComponent implements OnInit {
  subscription: Subscription;
  item: Object;
  items=[];
  itemDetails;
  picture: string;
  category: string;
  title: string;
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

  formatPropertyColumnText(text:string){
    return text.split('_').map((segment)=>{
      segment.slice(0,1).toUpperCase() + segment.substr(1)
    }).join(" ")
  }
  

  isIterable = (object) => object != null && typeof object !== 'string' && typeof object[Symbol.iterator] === 'function'
  
}
