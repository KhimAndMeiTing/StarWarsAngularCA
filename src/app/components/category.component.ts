import { Component, OnInit } from '@angular/core';
import {StarWarsService} from '../starwars.service'

import { Router } from '@angular/router';
import { Location } from '@angular/common';

export interface Category {
  name: string;
  
}
const ELEMENT_DATA: Category[] = [
  { name: 'Hydrogen'},
  { name: 'Helium'},
  {name: 'Lithium'},
  {name: 'Beryllium'},
  {name: 'Boron'},
  { name: 'Carbon'},
  { name: 'Nitrogen'},
  { name: 'Oxygen'},
  {name: 'Fluorine'},
  {name: 'Neon'},
];
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  cat: string[] = [];
  

  constructor(private router:Router, private _location: 
    Location,private starwarservice:StarWarsService){
    starwarservice
      .getAllCategories()
      .then((result)=>{
          for(var key in result){
            this.cat.push(key)
          }
      })
    
  }
  // displayedColumns: string[] = ['cat'];
  // dataSource = this.cat;
  goToCategoryItem(){
     this.starwarservice.setItemSelected('PLANNEETSS');
     this.router.navigate(['categoryItems']);
  }
  displayedColumns: string[] = [ 'name'];
  dataSource = ELEMENT_DATA;
  
  
}
