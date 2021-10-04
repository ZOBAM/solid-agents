import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const userToken = this.auth.currentUserToken;
    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${userToken}`}
    });
    //console.log("running interceptor");
    //console.log(req.url);
    return next.handle(authReq);
  }
}
