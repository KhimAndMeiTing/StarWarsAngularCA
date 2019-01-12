import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../starwars.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

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
// interface IncomingSubscription{
//   category: string
//   page: number
//   id: number
// }
export class ItemDetailsComponent implements OnInit {
  subscription: Subscription;
  item: Object;
  itemDetails;
  picture: string;

  constructor(private starwarsservice: StarWarsService, router: Router) {}

  ngOnInit() {
    this.itemDetails = []
    this.subscription = this.starwarsservice.item$.subscribe(
      item => (this.item = item)
    );

    let category = "films";
    let page = 2;
    let id = 2;
    console.log('itemdetailssss:::')
    console.log(this.itemDetails)
    
    //this.starwarsservice.getItemDetails(this.item['category'], this.item['page'], this.item['id'])
    this.starwarsservice.getItemDetails(category, page, id).then(itemdetail => {
      console.log('itemdetail:::')
      console.log(itemdetail)
      Object.keys(itemdetail).forEach(key=>{
        let itemDetailProp = {}
        itemDetailProp[key] = itemdetail[key]
        this.itemDetails.push(itemDetailProp);
      })
      console.log('itemdetailssss:::')
      console.log(this.itemDetails)
      
    });


    //this.picture = this.starwarsservice.getPicture(this.item['category'], this.item['page'], this.item['id'])
    this.picture = this.starwarsservice.getPicture(category, page, id);
  }
}
