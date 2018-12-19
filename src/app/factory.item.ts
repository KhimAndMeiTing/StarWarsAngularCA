import { Planet } from './model'
import { People } from './model'
import { Film } from './model'
import { Vehicle } from './model'
import { Starship } from './model'
import { Species } from './model'

export var categoryFactory = (type:string)=>{
    switch(type){
        case '':
            return new Array<Planet|People|Species|Film|Vehicle|Starship>();       
        case 'planets':
            return new Array<Planet>();
        case 'people':               
            return new Array<People>();
        case 'films':
            return new Array<Film>();
        case 'vehicles':
            return new Array<Vehicle>();    
        case 'species':
            return new Array<Species>();
        case 'starship':
            return new Array<Starship>();
    } 
}
