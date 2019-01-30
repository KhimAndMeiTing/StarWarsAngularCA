import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { categoryFactory } from "./factory.item";
import { Planet } from "./model";
import { People } from "./model";
import { Film } from "./model";
import { Vehicle } from "./model";
import { Starship } from "./model";
import { Species } from "./model";

const BASE_URL = "https://swapi.co/api/";
var items = [];

@Injectable()
export class StarWarsService {
  constructor(private http: HttpClient) {}

  private _itemSource = new BehaviorSubject<Object>("");
  item$ = this._itemSource.asObservable();

  setItemSelected(input: Object) {
    this._itemSource.next(input);
  }

  getAllCategories() {
    let categoryArray = [];
    return this.http
      .get(BASE_URL)
      .toPromise()
      .then(categories => {
        for (let key in categories) {
          let cat = { name: key };
          categoryArray.push(cat);
        }
        return Promise.resolve(categoryArray);
      })
      .catch(err => console.log(err));
  }

  getCategoryItems(
    category: string,
    pageCount = 1
  ): Promise<(Planet | People | Species | Film | Vehicle | Starship)[] | void> {
    let items = categoryFactory(category);
    let data = [];

    const qs = new HttpParams().set("page", pageCount.toString());

    return this.http
      .get(BASE_URL + category, { params: qs })
      .toPromise()
      .then(result => {
        for (let r of result["results"]) {
          items.push(r);
        }
        let oneDataItem = result["results"].map(x => {
          return {
            name: x.name ? x.name : x.title,
            category: category,
            page: pageCount
          };
        });
        data.push(...oneDataItem);
        return Promise.resolve(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getItemDetails(category = "films", page = 1, id = 2) {

    let cid = this.getCorrectedId(category,page,id)

    if (items.length != 0) return Promise.resolve(items[id]);
    else {
      let itemDetail = null;

      return this.http
        .get(BASE_URL + category + "/" + cid)
        .toPromise()
        .then(res => {
          return (itemDetail = { ...res });
        })
        .then(result => {
          itemDetail = this.getNames(result);
          return this.getNames(result);
        })
        .then(newobj => {
          return Promise.resolve(itemDetail);
        })
        .catch(err => console.log(err));
    }
  }

  async getNames(itemDetailObj) {
    let newItemDetail = {};
    Object.entries(itemDetailObj).forEach(async ([key, value]) => {
      if (Array.isArray(value)) {
        var tempArray = [];
        value.forEach(async url => {
          this.http
            .get(url)
            .toPromise()
            .then(resp => {
              resp["name"]
                ? tempArray.push(resp["name"])
                : tempArray.push(resp["title"]);
            });
        });
        newItemDetail[key] = tempArray;
      } else if (key !== "url" && !value.toString().match(/(http|https)/gm)) {
        newItemDetail[key] = itemDetailObj[key];
      }
      else{
        this.http
            .get(value.toString())
            .toPromise()
            .then(resp => {
              resp["name"]
                ? newItemDetail[key] = resp["name"]
                : newItemDetail[key] = resp["title"];
            });
      }
    });
    return newItemDetail;
  }

  getPicture(category, page, id) {
    let cid = this.getCorrectedId(category,page,id)
    if (category === "people") category = "characters";
    return `https://starwars-visualguide.com/assets/img/${category}/${cid}.jpg`;
  }

  addComments(category, id) {
    //create dexiejs
  }

  getCorrectedId(category, page, id){
    let cid = (page - 1) * 10 + id + 1;

    if (category === "planets") {
      if (cid > 0) cid++;
      if (cid == 61) cid = 1;
      if (cid > 61) cid--;
    }

    if (category === "people") {
      if (cid > 16) cid++;
      if (cid > 34) cid++;
      if (cid > 46) cid++;
      if (cid > 75) cid--;
      if (cid == 89) cid = 35;
    }

    if (category === "species") {
      if (cid > 0) cid = cid + 4;
      if (cid == 38) cid = 3;
      if (cid == 39) cid = 2;
      if (cid == 40) cid = 1;
      if (cid == 41) cid = 4;

    }

    if (category === "vehicles") {
      if (cid > 0) cid = cid + 3;
      if (cid > 4) cid++;
      if (cid > 8) cid = cid + 5;
      if (cid > 14) cid++;
      if (cid > 16) cid++;
      if (cid > 20) cid = cid + 3;
      if (cid > 26) cid = cid + 3;
      if (cid > 30) cid = cid + 2;
      if (cid > 38) cid = cid + 3;
      if (cid > 42) cid++;
      if (cid > 46) cid = cid + 3;
      if (cid > 51) cid = cid + 8;
      if (cid > 60) cid++;
      if (cid > 62) cid = cid + 4;
      if (cid > 67) cid++;
      if (cid > 73) cid = cid + 2;
      if (cid > 76) cid = 52 + (cid - 76);


    }

    if (category === "starships") {
      if (cid > 1) cid = cid + 3;
      if (cid > 5) cid = cid + 3;
      if (cid > 13) cid = cid + 7;
      if (cid > 23) cid = cid + 3;
      if (cid > 29) cid++;
      if (cid > 31) cid = cid + 7;
      if (cid > 41) cid++;
      if (cid > 43) cid = cid + 3;
      if (cid == 50) cid = 3;
      if (cid == 51) cid = 59;
      if (cid == 52) cid = 61;
      if (cid == 53) cid = 77;

      if (cid == 56) cid = 52;
      if (cid == 57) cid = 58;
      if (cid == 58) cid = 63;
      if (cid == 59) cid = 64;
      if (cid == 60) cid = 65;
      if (cid == 61) cid = 66;
      if (cid == 62) cid = 74;
      if (cid == 63) cid = 75;
      if (cid == 64) cid = 2;
      if (cid == 65) cid = 68;
    }
    return cid
  }
}
