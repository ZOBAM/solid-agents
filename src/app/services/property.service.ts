import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  postURL = environment.apiUrl + '/properties';
  apiURL = environment.apiUrl + '/';
  isEditing: boolean = false;
  userProperties: any;
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  postProperty(propertyForm: any) {
    //console.log('about to log received form data')
    //console.log(propertyForm)
    return this.http.post(this.postURL, propertyForm);
  }
  getProperties(propInfo = '') {
    let urlPara = propInfo !== '' ? '/' + propInfo : propInfo;
    return this.http
      .get(this.postURL + urlPara)
      .pipe(catchError(this.errorService.handleError));
  }
  getUsers() {
    return this.http.get(this.apiURL + 'users');
  }
  deleteProperty(propID: any) {
    return this.http.delete(this.postURL + '/' + propID);
  }
  search(params: any) {
    let query: string = params.get('query');
    let state: string = params.get('state');
    let lga: string = params.get('lga');
    let town: string = params.get('town');
    return this.http.get(
      this.apiURL +
        'search?query=' +
        query +
        '&state=' +
        state +
        '&lga=' +
        lga +
        '&town=' +
        town
    );
  }
  getStates() {
    return this.http.get(this.apiURL + 'states');
  }
  /* requestCall(formData: any) {
    return this.http.post(this.apiURL + 'request_call', formData);
    console.log(formData);
  } */
  request(formData: any, type: string = 'property') {
    if (type == 'property')
      return this.http.post(this.apiURL + 'request_property', formData);
    else return this.http.post(this.apiURL + 'request_call', formData);
    //console.log(formData);
  }
}
