import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { StarWarsService } from "../starwars.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { categoryFactory } from "../factory.item";
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: "app-category-item",
  templateUrl: "./category-item.component.html",
  styleUrls: ["./category-item.component.css"]
})
export class CategoryItemComponent implements OnInit {
  //item: string[]=[];
  item: string;

  category: Object;
  subscription: Subscription;
  pageSubscription: Subscription;
  categoryItems;
  pageCount: number

  ngOnInit() {
    this.subscription = this.starwarservice.item$.subscribe(
      item => (this.category = item)
    );
    this.categoryItems = categoryFactory(this.category.toString());
    this.starwarservice
      .getCategoryItems(this.category.toString(), this.pageCount)
      .then(result => {
        this.categoryItems = result;
      });
  }

  constructor(
    private router: Router,
    private _location: Location,
    private starwarservice: StarWarsService
  ) {
    this.pageCount = 1
  }

  onNextPage(){
    this.pageCount++;
    this.starwarservice
      .getCategoryItems(this.category.toString(), this.pageCount)
      .then(result => {
        this.categoryItems = result;
        console.log(this.categoryItems)
      });
  }
  onPreviousPage(){
    if(this.pageCount > 1 ){
      this.pageCount--;
      this.starwarservice
        .getCategoryItems(this.category.toString(), this.pageCount)
        .then(result => {
          this.categoryItems = result;
          console.log(this.categoryItems)
        });
    }
  }

  goToItemDetail(category:string, page=1, id){
    this.starwarservice.setItemSelected({
      category: category,
      page: page,
      id: id
    });
    this.router.navigate(["itemDetail"]);
  }
}
