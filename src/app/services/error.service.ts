import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error: boolean = false;
  errorMessage: any;

  constructor() { }
  handleError(error: HttpErrorResponse){
    this.error = true;
    if(error.error instanceof ErrorEvent){
      this.errorMessage = 'Sorry, something is not right: ' + error.error.message;
      console.error(this.errorMessage);
    }
    else{
      if(typeof error.error.errors !== 'string'){
          this.errorMessage = error.error.errors;
      }
      else
      this.errorMessage = error.error.errors.message;
      console.error('Sorry, error on the server: ', error.error.errors);
    }
    return throwError(this.errorMessage);
  }
}
