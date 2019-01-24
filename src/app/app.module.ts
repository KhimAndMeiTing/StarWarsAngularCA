import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category.component';
import { CategoryItemComponent } from './components/category-item.component';
import { ItemDetailsComponent } from './components/item-details.component';
import { StarWarsService } from './starwars.service'
import { RoutingModule } from './app.routing'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material'
import { MatCardModule } from '@angular/material'
import { MatProgressSpinnerModule } from '@angular/material'
import { MatMenuModule } from '@angular/material'
import { MatIconModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material'
import { MatButtonModule } from '@angular/material'
import { MatFormFieldModule } from '@angular/material'
import { MatInputModule } from '@angular/material'
import { MatSelectModule } from '@angular/material'
import { MatSortModule } from '@angular/material'
import {
  Ng6SocialButtonModule,SocialServiceConfig
} from "ng6-social-button";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KeysPipe } from './pipe.transform';
export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
      .addFacebook("378570392952824")     
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryItemComponent,
    ItemDetailsComponent,
    KeysPipe,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    Ng6SocialButtonModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
 
  ],
  providers: [
    StarWarsService,
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
