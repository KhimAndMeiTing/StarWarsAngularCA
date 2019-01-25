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

  getAllCategories(){    
    let categoryArray = [];
    return this.http.get(BASE_URL)
                  .toPromise()
                  .then(categories => {
                    for(let key in categories){
                      let cat = {'name': key};
                      categoryArray.push(cat)
                    }
                    return Promise.resolve(categoryArray)
                  }).catch(err=> console.log(err));  
  }

  getCategoryItems(category: string, pageCount = 1):
   Promise<(Planet | People | Species | Film | Vehicle | Starship)[] |void> {
    
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
        let oneDataItem = result["results"].map(x =>{
          return {
            'name': x.name ? x.name : x.title,
            'category': category,
            'page': pageCount
          }
        });
        data.push(...oneDataItem);
        return Promise.resolve(data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  getItemDetails(category="films", page=1, id=2) {
    let cid = id/page + 1;
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
          itemDetail = this.getNames(result)
          return this.getNames(result);
        })
        .then(newobj => {
            return Promise.resolve(itemDetail)
        })
        .catch(err => console.log(err)); 
    }

  }
z
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
    console.log('getpicture')
    console.log(id)
    console.log(cid)
    if (category === "people") 
        category = "characters";
    return `https://starwars-visualguide.com/assets/img/${category}/${cid}.jpg`;
  }

  addComments(category,id) {
    //create dexiejs
  }
}
