//Injectable nos permite definir el "decorador injectable" de cada clase
import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(baseUrl + 'dishes');
    //of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable <Dish>{
    return this.http.get<Dish>(baseUrl + "dishes/" + id);
    //of(DISHES.filter((dish)=>(dish.id===id))[0]).pipe(delay(2000));
    }


  getFeaturedDish(): Observable <Dish>{
    return  this.http.get<Dish[]>(baseUrl + 'dishes?featured=true').pipe(map(dish => dish[0]));
    //of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string [] | any>{
    //Toma cada item de un arreglo y lo pasa a otro según lo indicado. 
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    //of(DISHES.map(dish => dish.id));
  }
}
