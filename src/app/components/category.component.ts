import { Component, OnInit } from '@angular/core';
import {StarWarsService} from '../starwars.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  cat: string[] = [];

  constructor(private starwarservice:StarWarsService){
    starwarservice
      .getAllCategories()
      .then((result)=>{
        this.cat = result;
      })
  }
  // categories = [ {category: 'Characters'},
  // {category: 'Films'},
  // {category: 'Species'},
  // {category: 'Starship'},
  // {category: 'Vehicles'},
  // {category: 'Planets'}];

}
