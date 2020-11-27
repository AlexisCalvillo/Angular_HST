import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl'
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private  proccesHTTPMsgService : ProcessHTTPMsgService) { }

  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseUrl + 'promotions')
    .pipe(catchError(this.proccesHTTPMsgService.handleError));
    //of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(baseUrl + 'promotions/' + id)
    .pipe(catchError(this.proccesHTTPMsgService.handleError));
    //of(PROMOTIONS.filter((promotion)=>(promotion.id===id))[0]).pipe(delay(2000));
  }
  
  getFeaturedPromotion():Observable<Promotion>{
    return  this.http.get<Promotion[]>(baseUrl + 'promotions?featured=true').pipe(map(dish => dish[0]))
    .pipe(catchError( this.proccesHTTPMsgService.handleError));;
    //of(PROMOTIONS.filter((promotion)=>promotion.featured)[0]).pipe(delay(2000));
  }
}
