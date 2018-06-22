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

  getComments(serviceId : number){
    return this.client.get(this.global.address+'comment/get?serviceId='+serviceId);
  }

  rateService(serviceId: number, rate: number){
    return this.client.post(this.global.address + 'service/rate', {Id:serviceId, Rate:rate});  
  }

  sendComment(text: string, sid: number){
    let obj = {
      Content: text,
      RAIdentityUserId: this.global.user.Id,
      ServiceId: sid
    }
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    return this.client.post(this.global.address+"comment/add", obj);
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

  addNewVehicle(vehicle, fileToUpload) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.post(this.global.address + 'service/addVehicle/' + vehicle.ServiceId, vehicle) as Observable<any>;
    retVal.subscribe(
      result => {
        vehicle.Id = result;
        this.imageService.postFileToVehicle(fileToUpload, vehicle.Id).subscribe(
          result => {
            alert('New Vehicle Added!');
          },
          err => {
            alert('Error adding picture to new vehicle');
          }
        );
      },
      err => {
        alert('Error adding new vehicle');
      }
    );
  }
  addNewOffice(office, fileToUpload) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retVal = this.client.post(this.global.address + 'service/addOffice/' + office.ServiceId, office) as Observable<any>;
    retVal.subscribe(
      result => {
        office.Id = result;
        this.imageService.postFileToOffice(fileToUpload, office.Id).subscribe(
          result => {
            alert('New Office Added');
          },
          err => {
            alert('Error in uploading image to new office');
          }
        );
      },
      err => {
        alert('Error in adding new office');
      }
    );
  }

  getAllMyServices(id: number) {
    return this.client.get(this.global.address + 'service/getServicesForManager/' + id) as Observable<any>;
  }
}
