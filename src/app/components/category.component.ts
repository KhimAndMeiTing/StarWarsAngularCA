import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../starwars.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { SocialService } from "ng6-social-button";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent {
  cat = [];
  displayedColumns: string[] = ["name"];
  dataSource;
  selectedRowIndex;
  shareObj = {
    href: "https://khimandmeiting.github.io/StarWarsAngularCA/",
    hashtag: "#FACEBOOK-SHARE-HASGTAG"
  };
  constructor(
    private router: Router,
    private _location: Location,
    private starwarservice: StarWarsService,
    private socialAuthService: SocialService
  ) {}
  signOut() {
    if (this.socialAuthService.isSocialLoggedIn()) {
      this.socialAuthService.signOut().catch(err => {});
    }
  }

  getSocialUser(socialUser) {
    console.log(socialUser);
  }
  ngOnInit() {
    this.starwarservice.getAllCategories().then(result => {
      if (result) this.cat = [...result];
      this.dataSource = this.cat;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.name;
    this.starwarservice.setItemSelected(this.selectedRowIndex);
    this.router.navigate(["categoryItems", this.selectedRowIndex, 1]);
  }

  formatRowText(text:string){
    return text.slice(0,1).toUpperCase() + text.substr(1)
  }
}
