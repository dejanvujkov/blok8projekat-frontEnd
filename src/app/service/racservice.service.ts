import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {a} from '@angular/core/src/render3';

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
  getUnapprovedServices() {
    return this.client.get('http://localhost:51680/service/getNonApproved') as Observable<any>;
  }
  getManagers() {
    return this.client.get('http://localhost:51680/user/getAllManagers') as Observable<any>;
  }

  getAllUnapprovedUsers() {
    return this.client.get('http://localhost:51680/user/getAllUnapproved') as Observable<any>;
  }

  approveUser(user) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.put('http://localhost:51680/user/approve', user);
    retVal.subscribe(
      result => {
        return result;
      },
      err => {
        console.log('error in approving user');
      }
    );
  }
  approveService(service) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.put('http://localhost:51680/service/approve', service);
    retVal.subscribe(
      result => {
        return result;
      },
      err => {
        console.log('error in approving service');
      }
    );
  }
}
