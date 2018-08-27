import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category.component';
import { CategoryItemComponent } from './components/category-item.component';
import { ItemDetailsComponent } from './components/item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryItemComponent,
    ItemDetailsComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
