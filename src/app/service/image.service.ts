import { Injectable } from '@angular/core';
import {Global} from '../global';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private global: Global, private httpClient: HttpClient) { }

  postFile(fileToUpload: File, userId: number) {
    const endpoint = this.global.address + 'user/uploadImage/' + userId;
    const formData: FormData = new FormData;
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData);
  }

  postFileToService(fileToUpload: File, serviceId: number) {
    const endpoint = this.global.address + 'service/upload/' + serviceId;
    const formData: FormData = new FormData;
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.httpClient.put(endpoint, formData);
  }

  postFileToVehicle(fileToUpload: File, vehicleId: number) {
    const endpoint = this.global.address + 'vehicle/uploadToVehicle/' + vehicleId;
    const formData: FormData = new FormData;
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.httpClient.put(endpoint, formData);
  }

  postFileToOffice(fileToUpload: File, officeId: number) {
    const endpoint = this.global.address + 'office/uploadToOffice/' + officeId;
    const formData: FormData = new FormData;
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.httpClient.put(endpoint, formData);
  }
}
