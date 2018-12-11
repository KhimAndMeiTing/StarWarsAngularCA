import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category.component';
import { CategoryItemComponent } from './components/category-item.component';
import { ItemDetailsComponent } from './components/item-details.component';
import { StarWarsService }  from './starwars.service'
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryItemComponent,
    ItemDetailsComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
