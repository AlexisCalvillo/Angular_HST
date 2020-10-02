//Injectable nos permite definir el "decorador injectable" de cada clase
import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Promise<Dish[]>{
    return Promise.resolve(DISHES);
  }

  geDish(id: Number): Promise <Dish>{
    return Promise.resolve(DISHES.filter((dish)=>(dish.id===id))[0])
  }

  getFeaturedDish(): Promise <Dish>{
    return Promise.resolve(DISHES.filter((dish)=>dish.featured)[0])
  }
}
