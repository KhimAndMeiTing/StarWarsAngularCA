import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'


const BASE_URL = 'https://swapi.co/api/';

@Injectable()
export class StarWarsService{
    constructor(private http: HttpClient){}
    

    getAllCategories(){
        return(
            this.http.get(BASE_URL)
            .toPromise()
            .then(result=>{
                console.log('api activate');
                var categories: string[] = [];
                for(var s in result)
                    categories.push(s);
                return categories;
            })
        );
    }

    getCategoryItems(category:string){
        const qs = new HttpParams()
                        .set('page', '1')
        this.http.get(BASE_URL + category, { params: qs })

    }

}
