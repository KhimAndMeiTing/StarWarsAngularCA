import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

import { categoryFactory } from './factory.item';


const BASE_URL = 'https://swapi.co/api/';

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
        return (
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

    getCategoryItems(category: string) {
        let pageCount = 1;

        category = 'people'
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

                    var namesForOnepage = result['results'].map(x => x.name ? x.name : x.title)
                    names.push(...namesForOnepage)
                    if (result['next'])
                        return recursiveGet(++pageCount)
                })
                .catch(error => { console.log(error) })
        }

        recursiveGet(pageCount);

        return names;
    }

    getItemDetails() {

    }



}
