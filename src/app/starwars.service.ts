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

  itemSelected: string = "";
  private _itemSource = new BehaviorSubject<string>("");
  item$ = this._itemSource.asObservable();

  setItemSelected(input: string) {
    this._itemSource.next(input);
  }

  getAllCategories() {
    return Promise.resolve(this.http.get(BASE_URL).toPromise());
  }

  getCategoryItems(category: string, pageCount = 1):
   Promise<(Planet | People | Species | Film | Vehicle | Starship)[]> {
    

    var items = categoryFactory(category);
    let names = [];

    const qs = new HttpParams().set("page", pageCount.toString());

    this.http
      .get(BASE_URL + category, { params: qs })
      .toPromise()
      .then(result => {
        for (let r of result["results"]) {
          items.push(r);
        }
        result["results"].forEach(x => {
          console.log(x.name ? x.name : x.title);
        });
        var namesForOnepage = result["results"].map(x =>
          x.name ? x.name : x.title
        );
        names.push(...namesForOnepage);
        
      })
      .catch(error => {
        console.log(error);
      });

    return Promise.resolve(items);
  }

  getItemDetails(category, page, id): Promise<Planet | People | Species | Film | Vehicle | Starship> {
    category = "films";
    id = 2;
    let cid = id/page + 1;
    console.log(items.length);
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
          console.log("result:::" + result);
          console.log(result);
          itemDetail = this.getNames(result)
          return this.getNames(result);
        })
        .then(newobj => {
            console.log('getdetails:::newobj')
            console.log(newobj)
            return Promise.resolve(itemDetail)
        })
        .catch(err => console.log(err));

        
    }

  }

  async getNames(itemDetailObj) {
    let newItemDetail = {};
    Object.entries(itemDetailObj).forEach(async ([key, value]) => {     
      if (Array.isArray(value)) {
        var tempArray = [];
        console.log('key::' + key)
        value.forEach(async url => {
          console.log("getNames(url)");
          console.log(url);
          this.http
            .get(url)
            .toPromise()
            .then(resp => {     
                resp['name']? tempArray.push(resp['name']) : tempArray.push(resp['title'])
            });
        });
        newItemDetail[key] = tempArray
      }
      else if(key!=='url'){
        newItemDetail[key] = itemDetailObj[key]
      }
      
    });
    return newItemDetail
  }

  getPicture(category, page, id) {
    let cid = id/page + 1;
    if (category === "people") 
        category = "characters";
    return `https://starwars-visualguide.com/assets/img/${category}/${cid}.jpg`;
  }

  addComments(category, id) {
    //create dexiejs
  }
}
