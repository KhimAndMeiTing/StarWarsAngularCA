import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../starwars.service";


import { Router } from "@angular/router";
import { Location } from "@angular/common";
// import { element } from "../../../node_modules/@angular/core/src/render3/instructions";



@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent {
  cat = [];
  displayedColumns: string[] = ["name"];
  dataSource;
  selectedRowIndex;

  constructor(
    private router: Router,
    private _location: Location,
    private starwarservice: StarWarsService
  ) {}
  ngOnInit() {
    this.starwarservice.getAllCategories().then(result => {
      if(result)
        this.cat = [...result];
      this.dataSource = this.cat;
    });
    
    
  }
 
  // goToCategoryItem() {
  //   this.starwarservice.setItemSelected("planets");
  //   this.router.navigate(["categoryItems"]);
  // }
  highlight(row){
    this.selectedRowIndex = row.name;
    this.starwarservice.setItemSelected(this.selectedRowIndex);
    this.router.navigate(["categoryItems"]);
    console.log(this.selectedRowIndex)
    }
}
