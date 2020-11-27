import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl'
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private  proccesHTTPMsgService : ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return  this.http.get<Leader[]>(baseUrl + 'leadership')
    .pipe(catchError( this.proccesHTTPMsgService.handleError));
  }

  getLeader(id:string):Observable<Leader>{
    return this.http.get<Leader>(baseUrl + "leadership/" + id)
    .pipe(catchError( this.proccesHTTPMsgService.handleError));
    //of(LEADERS.filter((leader)=>(leader.id===id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(baseUrl + 'leadership?featured=true').pipe(map(dish => dish[0]))
    .pipe(catchError( this.proccesHTTPMsgService.handleError));
    //of(LEADERS.filter((leader)=>(leader.featured))[0]).pipe(delay(2000));
  }

}
