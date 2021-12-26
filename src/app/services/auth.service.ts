import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  verified = false;
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router
  ) {}
  public isLoggedIn() {
    let currentUser = localStorage.getItem('userData');
    if (currentUser && JSON.parse(currentUser)) {
      this.setUser(JSON.parse(currentUser));
      return true;
    } else {
      return false;
    }
  }
  public isVerified() {
    //console.log(this.currentUser.email_verified_at != null ? true : false);
    return this.currentUser.email_verified_at != null ? true : false;
  }

  setUser(user: any) {
    //console.log(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUser = user.user;
    this.currentUserToken = user.access_token;
    this.userCallRequests = user.user?.call_requests;
    this.userPropertyRequests = user.user?.property_requests;
    this.loggedIn.next(true);
  }
  updateUser(payload: any) {
    let user: any = localStorage.getItem('userData');
    user = JSON.parse(user!);
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        user.user[key] = payload[key];
      }
    }
    localStorage.setItem('userData', JSON.stringify(user));
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
  verify(payload: any) {
    return this.http.post(environment.apiUrl + '/verify', payload);
  }
}
