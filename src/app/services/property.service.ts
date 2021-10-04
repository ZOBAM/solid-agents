import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment'
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  postURL = environment.apiUrl+'/properties';
  isEditing: boolean = false;
  userProperties: any;
  constructor(private http: HttpClient, private errorService: ErrorService) { }
  postProperty(propertyForm: any){
    //console.log('about to log received form data')
    //console.log(propertyForm)
    return this.http.post(this.postURL, propertyForm);
  }
  getProperties(propInfo = ''){
    let urlPara = (propInfo !== '')? '/'+propInfo : propInfo;
    return this.http.get(this.postURL+urlPara).pipe(
      catchError(this.errorService.handleError)
    )
  }
  getUsers(){
    return this.http.get(environment.apiUrl+'/users');
  }
  deleteProperty(propID: any){
    return this.http.delete(this.postURL+'/'+propID);
  }
}
