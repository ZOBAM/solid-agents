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
  propertyTypes = ['Land', 'House'];
  dealTypes = ['Rent', 'Sale', 'Swap'];
  purposes = ['residential', 'commercial', 'mixed'];
  houseTypes = [
    'shop',
    'single room',
    'rooms & parlor',
    'self-contain',
    'flat',
    'bungalow',
    'warehouse',
    'event center',
  ];
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
  getRequests() {
    return this.http.get(this.apiURL + 'requests');
  }
  deleteProperty(propID: any) {
    return this.http.delete(this.postURL + '/' + propID);
  }
  search(params: any, isFilter = false) {
    console.log('type of params ' + typeof params);
    let query: string;
    let state: string;
    let lga: string;
    let town: string;
    let dealType = '';
    let propertyType = '';
    let lowestPrice = null;
    let highestPrice = null;
    if (!isFilter) {
      query = params.get('query');
      state = params.get('state');
      lga = params.get('lga');
      town = params.get('town');
    } else {
      console.log(params);
      query = params['query'];
      state = params['state'];
      lga = params['lga'];
      town = params['town'];
      dealType = params['dealType'];
      propertyType = params['propertyType'];
      lowestPrice = params['lowestPrice'];
      highestPrice = params['highestPrice'];
    }
    if (state) {
      query += '&state=' + state;
      if (lga) {
        query += '&lga=' + lga;
      }
    }
    if (town) {
      query += '&town=' + town;
    }
    if (propertyType) {
      query += '&propertyType=' + propertyType;
    }
    if (dealType) {
      query += '&dealType=' + dealType;
    }
    if (lowestPrice) {
      query += '&lowestPrice=' + lowestPrice;
    }
    if (highestPrice) {
      query += '&highestPrice=' + highestPrice;
    }
    return this.http.get(this.apiURL + 'search?query=' + query);
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
