import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  constructor(private starwarservice: StarWarsService) { }

  subscription: Subscription
  initName = "category-item works!"

  name = 'category-item'

  ngOnInit() {
    this.subscription = this.starwarservice.item$
       .subscribe(item => this.name = item)
  }

}
