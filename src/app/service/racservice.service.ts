import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../global';
import {ImageService} from './image.service';

@Injectable({
  providedIn: 'root'
})
export class RACServiceService {

  constructor(private client: HttpClient, private global: Global, private imageService: ImageService) {  }
  getAllServices() {
   return this.client.get(this.global.address + 'service/getAllApprovedServices') as Observable<any>;
  }
  getService(Id: number) {
    return this.client.get(this.global.address + 'service/getDetails?id=' + Id) as Observable<any>;
  }
  getUnapprovedServices() {
    return this.client.get(this.global.address + 'service/getNonApproved') as Observable<any>;
  }
  getManagers() {
    return this.client.get(this.global.address + 'user/getAllManagers') as Observable<any>;
  }

  getAllUnapprovedUsers() {
    return this.client.get(this.global.address + 'user/getAllUnapproved') as Observable<any>;
  }

  approveUser(user) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.put(this.global.address + 'user/approve', user) as Observable<any>;
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
    const retVal = this.client.put(this.global.address + 'service/approve', service) as Observable<any>;
    retVal.subscribe(
      result => {
        return result;
      },
      err => {
        console.log('error in approving service');
      }
    );
  }

  blockManager(manager) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.put(this.global.address + 'user/blockManager', manager) as Observable<any>;
    retVal.subscribe(
      result => {
        alert('Manager ' + manager.Id + ' blocked!');
        return result;
      },
      err => {
        alert('error in blocking manager');
      }
    );
  }

  addNewService(service, fileToUpload) {
    service.ManagerId = this.global.user.AppUser.Id;
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.post(this.global.address + 'service/add', service) as Observable<any>;
    retVal.subscribe(
      result => {
        service.Id = result;
        this.imageService.postFileToService(fileToUpload, service.Id).subscribe(
          result => {
            alert('New service added!');
          },
          err => {
            alert('Error uploading image');
          }
        );
      },
      err => {
        alert('Error during adding new service');
      }
    );
  }
}
