import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true);
  cast = this.loggedIn.asObservable();
  registerURL = environment.apiUrl + '/register';
  loginURL = environment.apiUrl + '/login';
  currentUser: any;
  currentUserToken: any;
  userCallRequests = [];
  userPropertyRequests = [];
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  public isLoggedIn() {
    let currentUser = localStorage.getItem('userData');
    if (currentUser && JSON.parse(currentUser)) {
      this.setUser(JSON.parse(currentUser));
      return true;
    } else {
      return false;
    }
  }

  setUser(user: any) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUser = user.user;
    this.currentUserToken = user.access_token;
    this.userCallRequests = user.user.call_requests;
    this.userPropertyRequests = user.user.property_requests;
    this.loggedIn.next(true);
  }
  registerUser(formData: any) {
    console.log('Trying to login');
    return this.http
      .post(this.registerURL, formData)
      .pipe(catchError(this.errorService.handleError));
  }
  login(credentials: any) {
    console.log('Trying to login');
    console.log(credentials);
    return this.http
      .post(this.loginURL, credentials)
      .pipe(catchError(this.errorService.handleError));
  }
  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('userData');
  }
  getLoggedIn() {
    let newState;
    this.loggedIn.subscribe((status) => {
      newState = status;
    });
    console.log(newState);
    return newState;
  }
}
