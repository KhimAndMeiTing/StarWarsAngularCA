import { Planet } from './model'
export class CategoryFactory{

    type:string;

    constructor(type:string){
        this.type = type
        console.log(this.type)
    }

    getInterface(){
        console.log(this.type==='planets')
        switch(this.type){       
            case 'planets':
                var category: Planet[] = [];
                return category
        } 
    } 
    
}