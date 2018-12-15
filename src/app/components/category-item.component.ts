import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  constructor() { }

  initName = "category-item works!"

  name = 'category-item'

  ngOnInit() {
  }

  @Output() sendToParent:EventEmitter<string> = new EventEmitter<string>();

  passNameToParent(){
    this.sendToParent.emit(this.name);
  }
}
