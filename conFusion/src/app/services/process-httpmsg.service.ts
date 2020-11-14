import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  

  public handleError(error: HttpErrorResponse | any){
    let errMsg: string;
    if( error.error instanceof ErrorEvent){
      errMsg = error.error.message;
     // console.log("Dentro if " + errMsg)
    }
    else{
      errMsg= `${error.status} - ${error.statusText || ''} ${error.error}`; 
      //console.log("Else if " + errMsg)
    }

    return throwError(errMsg);

  }
}
