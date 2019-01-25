import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugHelper } from 'protractor/built/debugger';
import { DataSource } from '../../../node_modules/@angular/cdk/table';



@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})

export class CategoryItemComponent implements OnInit {
  //item: string[]=[];
  item: string;
  initName = "category-item works!" ;
  name : Object;
  subscription: Subscription;
  info = [];
  dataSource;
  displayedColumns: string[] = ['name'];
  ngOnInit() {
    this.starwarservice.getCategoryItems("people",2).then(result => {
      if(result){
        this.info = [...result];
        if(this.info.length > 0)
          this.dataSource = this.info;
        console.log('this.info')
        console.log(this.dataSource);
        //console.log(this.displayedColumns);
        //this.info.push({'name':'hello', 'heeloo':'bye'})
      }

    });

  }
  constructor(
    private router: Router,
    private _location: Location, 
    private starwarservice: StarWarsService) {
      
    // this.starwarservice.
    //    getCategoryItems(this.name['name']).then((result)=>{
    //      this.info.push(result) ;
    //    });
  }
  
  // goToItemDetails(){
  //   this.starwarservice.setItemSelected('apple');
  //   this.router.navigate(['itemDetails']);
  // }

   
    
  
}