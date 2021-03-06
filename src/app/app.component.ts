import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StarWarsService } from './starwars.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router, private _location: Location, private starwarservice: StarWarsService){}

  title = 'StarWarsAngularCA';
  data = []
  
  goToCategoryItem(){
    this.starwarservice.setItemSelected('planets')
    this.router.navigate(['categoryItems'])
  }
  goBack() {
    this._location.back();
  }
  
  getCategoryItems(){
    this.starwarservice.getCategoryItems('planets').then(result=>{
      this.data.push(result)
    })
  }

}
