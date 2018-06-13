import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RACServiceService {

  constructor(private client: HttpClient) {  }
  getAllSerivices() {
   return this.client.get('http://localhost:51680/service/getAllApprovedServices') as Observable<any>;
  }
  getService(Id: number) {
    return this.client.get('http://localhost:51680/service/getDetails?id=' + Id) as Observable<any>;
  }
}
