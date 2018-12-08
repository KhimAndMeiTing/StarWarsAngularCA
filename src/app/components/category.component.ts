import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories = [ {category: 'Characters'},
  {category: 'Films'},
  {category: 'Species'},
  {category: 'Starship'},
  {category: 'Vehicles'},
  {category: 'Planets'}];


}
