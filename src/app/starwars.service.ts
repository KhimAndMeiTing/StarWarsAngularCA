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
            .then((res)=>{return itemDetail = {...res}})
            .then((result)=>{
                console.log('result:::' + result)
                console.log(result)
                this.getNames(result)
                // Object.entries(result).forEach(([key, value]) => {
                //     var tempObj = {}
                //     if (Array.isArray(value)) {
                //         let itemArray = [];
                //         value.forEach(url => {
                //             console.log("getNames(url)")
                //             let name = this.getNames(url)
                //             console.log(name)
                //         })
                //     }
                // })
                
            })

        }
        //map urls to page name/title + id
        //display the rest
    }

    async getNames(urls){
        Object.entries(urls).forEach(async ([key, value]) => {
            var tempObj = {}
            if (Array.isArray(value)) {
                let itemArray = [];
                value.forEach(async url => {
                    console.log("getNames(url)")
                    let name = this.http.get(url).toPromise().then(resp=>resp)
                    console.log(name)
                })
            }
        })
    }

    getPicture(category, id){
        if(category==='people')
            category = 'characters'
        return `https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`
    }

    addComments(category, id) {
        //create dexiejs
    }


}
