import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor(private router: Router,private _location:
    Location, private starwarservice: StarWarsService) {
  }

  ngOnInit() {
    
  }

}
