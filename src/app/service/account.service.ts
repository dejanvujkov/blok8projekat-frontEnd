import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from '../model/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private client: HttpClient) {}

  postMethod(user: LoginModel): Observable<any> {
    return this.client.post('localhost:51680/oauth/token', user);
  }
}
