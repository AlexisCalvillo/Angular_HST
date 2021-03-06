import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {Dish} from '../shared/dish';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
//Week 3
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Week 4
import { flyInOut, visibility, expand } from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style': 'display: block'

  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  dish:Dish;
  dishIds: string[];
  prev:string;
  next:string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string; 
  dishCopy: Dish;
  visibility='shown';

  @ViewChild('cform') commentFormDirective;

  formErrors={
    'name': '',
    'comment': ''
  };
  
  validationMessages={
    'name':{
      'required': 'Pon tu nombre vatoloco',
      'minlength': 'Más de dos caracteres',
      'maxlength': 'Pero tampoco te pases de 25'
    },
    'comment':{
      'required': 'Date en un comentario',
      'minlength': "De perdis pon algo"
    }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    

    @Inject('BaseUrl') private BaseUrl
    ) {
      this.createForm();
     }

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility='hidden'; return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.dishCopy=dish; this.setPrevNext(dish.id);this.visibility='shown';},
    errmess => this.errMess = <any>errmess);
    //const id = +this.route.params.pipe(switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
    //.subscribe(dish =>{ this.dish=dish; this.stePrevNext; });
    //Sin promises this.dish = this.dishservice.geDish(id);
    //this.dishservice.getDish(id).subscribe((dish)=>this.dish=dish);

  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index+1 ) % this.dishIds.length]
  }
  goBack(): void {
    this.location.back();
  }


  createForm(){
    this.commentForm= this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      comment: ['', [Validators.required, Validators.minLength(3)]],
      rating: 5
    })

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.commentForm){ return; }
    const form = this.commentForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+ '';
            }
          }
        }
      }
    } 
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({
      name: '',
      rating: 5,
      coment: ''
    });
    this.comment.date=new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishCopy)
    .subscribe(dish =>{
      this.dish=dish; this.dishCopy=dish;
    },
    errMess=>{
      this.dish=null; this.dishCopy=null;this.errMess= <any>errMess;
    });
  }

}
