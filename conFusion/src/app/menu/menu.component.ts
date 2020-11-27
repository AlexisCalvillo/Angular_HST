import { Component, Inject, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
//import {DISHES} from '../shared/dishes';
import {DishService} from '../services/dish.service';

//Animations
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style': 'display: block'

  },
  animations:[
    flyInOut(),
    expand()
  ] 
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  //selectedDish: Dish;

  constructor(private dishService:DishService, 
    @Inject('BaseUrl') private BaseUrl) { 
    
  }

  ngOnInit(): void {
    //Sin promises
    //this.dishes=this.dishService.getDishes();
    //Con promises
    //this.dishService.getDishes().then(
    //  (dishes)=>this.dishes=dishes
    //);
    //Con observables
    
    this.dishService.getDishes().subscribe(
     dishes=>this.dishes=dishes,
    errmess => this.errMess= <any>errmess)
    //console.log(this.errMess);
  }

  //onSelect(dish: Dish){
  //  this.selectedDish=dish;
  //}
}
