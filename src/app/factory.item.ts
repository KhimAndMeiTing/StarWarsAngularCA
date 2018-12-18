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
        
    } 
}