import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { StarWarsService } from "../starwars.service";
import { Subscription } from "rxjs";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { categoryFactory } from "../factory.item";
import { DataSource } from "@angular/cdk/table";
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: "app-category-item",
  templateUrl: "./category-item.component.html",
  styleUrls: ["./category-item.component.css"]
})
export class CategoryItemComponent implements OnInit {
  //item: string[]=[];
  item: string;
  title:string;
  category: Object;
  subscription: Subscription;
  pageSubscription: Subscription;
  categoryItems;
  pageCount: number;
  datasource;
  displayedColumns: string[] = ["name"];

  ngOnInit() {
    // this.subscription = this.starwarservice.item$.subscribe(
    //   item => {
    //     if(item)
    //       this.category = item
    //   }
    // );
    this.categoryItems = categoryFactory(this.category.toString());
    this.starwarservice
      .getCategoryItems(this.category.toString(), this.pageCount)
      .then(result => {
        this.categoryItems = result;

        this.datasource=this.categoryItems;
        this.title=this.category.toString();
      });
  }

  constructor(
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private starwarservice: StarWarsService
  ) {
    this.pageCount = 1
    this.route.params.subscribe(params => {
      this.category = params['cat']
      this.pageCount = params['page'] || 1
    })
  }
  
  onNextPage(){
    this.pageCount++;
    this.starwarservice
      .getCategoryItems(this.category.toString(), this.pageCount)
      .then(result => {
        this.datasource = result;
      });
    this.router.navigate(["categoryItems", this.route.params['_value']['cat'], this.pageCount]);
  }
  onPreviousPage(){
    if(this.pageCount > 1 ){
      this.pageCount--;
      this.starwarservice
        .getCategoryItems(this.category.toString(), this.pageCount)
        .then(result => {
          this.datasource = result;
        });
      this.router.navigate(["categoryItems", this.route.params['_value']['cat'], this.pageCount]);
    }
  }


  goToCategoryItems(){
    this.router.navigate(["categories"]);
  }

  formatTitleText(text:string){
    return text === 'people' ? 'CHARACTERS' : text.toUpperCase()
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
