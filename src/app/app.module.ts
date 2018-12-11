import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category.component';
import { CategoryItemComponent } from './components/category-item.component';
import { ItemDetailsComponent } from './components/item-details.component';
import { StarWarsService } from './starwars.service'
import { RoutingModule } from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryItemComponent,
    ItemDetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
