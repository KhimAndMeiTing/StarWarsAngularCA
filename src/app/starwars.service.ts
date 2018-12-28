import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

import { categoryFactory } from './factory.item';
import { Planet } from './model'
import { People } from './model'
import { Film } from './model'
import { Vehicle } from './model'
import { Starship } from './model'
import { Species } from './model'


const BASE_URL = 'https://swapi.co/api/';
var items = [];

@Injectable()
export class StarWarsService {

    constructor(private http: HttpClient) { }

    itemSelected: string = ''
    private _itemSource = new BehaviorSubject<string>('');
    item$ = this._itemSource.asObservable();



    setItemSelected(input: string) {
        this._itemSource.next(input)
    }

    getAllCategories() {
        return Promise.resolve(
            this.http.get(BASE_URL)
                .toPromise()
                .then(result => {
                    var categories: string[] = [];
                    for (var s in result)
                        categories.push(s);
                    return categories;
                })
        );
    }

    getCategoryItems(category: string): Promise<Planet[] | People[] | Species[] | Film[] | Vehicle[] | Starship[]> {
        let pageCount = 1;

        category = 'films'
        var items = categoryFactory(category)
        let names = [];

        const recursiveGet = (pageCount) => {
            const qs = new HttpParams()
                .set('page', pageCount.toString())

            this.http.get(BASE_URL + category, { params: qs })
                .toPromise()
                .then(result => {
                    for (let r of result['results']) {
                        items.push(r);
                    };
                    result['results'].forEach(x => {
                        console.log(x.name ? x.name : x.title)
                    });
                    var namesForOnepage = result['results'].map(x => x.name ? x.name : x.title)
                    names.push(...namesForOnepage)
                    if (result['next'])
                        return recursiveGet(++pageCount)
                    console.log(names)
                    console.log(items)
                })
                .catch(error => { console.log(error) })

        }

        recursiveGet(pageCount);

        return Promise.resolve(names);
    }

    getItemDetails(category, id) {
        //check items index if blank
        //if !blank get from items array
        //if blank go to url
        category = 'films'
        id = 2
        console.log(items.length)
        if (items.length != 0)
            return Promise.resolve(items[id])
        else {
            let itemDetail = null;
            this.http.get(BASE_URL + category + "/" + id)
                .toPromise()
                .then(res => {
                    itemDetail = res
                    Object.entries(itemDetail).forEach(
                        ([key, value]) => {
                            if (Array.isArray(value)) {
                                console.log(value)
                                let newValue = value.forEach(i =>
                                    this.http.get(i)
                                        .toPromise()
                                        .then(
                                            result => {
                                                var jsonData ={}
                                                jsonData[result['name']] = i
                                                console.log(jsonData)
                                                return jsonData
                                            }

                                        ))
                                
                            }
                        }
                    );
                    // console.log(itemDetail)
                    return Promise.resolve(itemDetail)
                })

        }
        //map urls to page name/title + id
        //display the rest
    }

    addComments(category, id) {
        //create dexiejs
    }


}
