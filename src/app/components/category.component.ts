import { Component, OnInit } from '@angular/core';
import {StarWarsService} from '../starwars.service'

import { Router } from '@angular/router';
import { Location } from '@angular/common';


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
}
