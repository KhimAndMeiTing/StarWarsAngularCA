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
  categoryItems;

  ngOnInit() {
    this.subscription = this.starwarservice.item$.subscribe(
      item => (this.category = item)
    );
    this.categoryItems = categoryFactory(this.category.toString());
    this.starwarservice
      .getCategoryItems(this.category.toString())
      .then(result => {
        this.categoryItems = result;
      });
  }

  constructor(
    private router: Router,
    private _location: Location,
    private starwarservice: StarWarsService
  ) {}
}
