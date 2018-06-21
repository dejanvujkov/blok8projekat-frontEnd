import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';
//import { DemoService } from '../services/demo.service';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AccountService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Intercepted");
    console.log("Token : ", localStorage.jwt);

    let jwt = localStorage.jwt;

    if (jwt) 
    {
        console.log(request)
        request = request.clone(
            {
                setHeaders: 
                { 
                    Authorization: `Bearer ${jwt}`
                }
            });
        console.log(request)
    }

    return next.handle(request);
  }
}