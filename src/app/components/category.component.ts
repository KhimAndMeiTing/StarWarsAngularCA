import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../starwars.service";


import { Router } from "@angular/router";
import { Location } from "@angular/common";



@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent {
  cat = [];
  displayedColumns: string[] = ["name"];
  dataSource;
  ELEMENT_DATA = [
    { name: "Hydrogen" },
    { name: "Helium" },
    { name: "Lithium" },
    { name: "Beryllium" },
    { name: "Boron" },
    { name: "Carbon" },
    { name: "Nitrogen" },
    { name: "Oxygen" },
    { name: "Fluorine" },
    { name: "Neon" }
  ];

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
  goToCategoryItem(){
     this.starwarservice.setItemSelected('planets');
     this.router.navigate(['categoryItems']);
  }
  // categories = [ {category: 'Characters'},
  // {category: 'Films'},
  // {category: 'Species'},
  // {category: 'Starship'},
  // {category: 'Vehicles'},
  // {category: 'Planets'}];
  // displayedColumns: string[] = ['cat'];
  // dataSource = this.cat;

}
