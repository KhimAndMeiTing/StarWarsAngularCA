import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StarWarsService } from '../starwars.service';


@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  constructor(private starwarservice: StarWarsService) { }

  initName = "category-item works!"

  name = 'category-item'

  ngOnInit() {
    this.initName = this.starwarservice.childInput
    console.log(this.initName)
  }

  @Output() sendToParent:EventEmitter<string> = new EventEmitter<string>();

  passNameToParent(){
    this.sendToParent.emit(this.name);
  }
}
