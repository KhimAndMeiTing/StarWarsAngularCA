import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Planet } from './model'


const BASE_URL = 'https://swapi.co/api/';

@Injectable()
export class StarWarsService {
    constructor(private http: HttpClient) { }

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

        category = 'planets'
        let names = [];
        let oneresp: JSON = JSON.parse('{}');

        const recursiveGet = (pageCount) => {
            const qs = new HttpParams()
                .set('page', pageCount.toString()) 
            this.http.get(BASE_URL + category, { params: qs })
                .toPromise()
                .then(result => {
                    var items: Planet[] = []
                    for(let r of result['results']) {
                        items.push({
                            name: r.name ,
                            rotation_period:r.rotation_period, 
                            orbital_period: r.orbital_period,
                            diameter: r.diameter,
                            climate: r.climate,
                            gravity: r.gravity, 
                            terrain: r.terrain, 
                            surface_water: r.surface_water,
                            population: r.population, 
                            residents: r.residents,
                            films: r.films
                        });
                    console.log(items)
                    };

                    var namesForOnepage = result['results'].map(x => x['name'])
                    names.push(...namesForOnepage)
                    //console.log(names)
                    // console.log('next:'+result['next'])
                    if(result['next'])
                        return recursiveGet(++pageCount)
                })
                .catch(error => { console.log(error) })          
            
        }

        recursiveGet(pageCount);
        console.log('respbody:'+names)
        return names;
    }

    getItemDetails(){
        
    }

}
