import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl'
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private  proccesHTTPMsgService : ProcessHTTPMsgService) { }

  submitFeedback(fb:Feedback): Observable<Feedback>{
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     };
     return this.http.post<Feedback>(baseUrl + 'feedback', fb, httpOptions)
     .pipe(catchError(this.proccesHTTPMsgService.handleError  ));
   }  
}
