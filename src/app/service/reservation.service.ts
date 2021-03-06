import { Injectable } from '@angular/core';
import { ReservationModel } from '../model/ReservationModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Global} from '../global';

@Injectable({
  providedIn: 'root'
})
export class ReservationService { 
  
  constructor(private httpClient: HttpClient, private global: Global) {}

  addReservation(reservation: ReservationModel) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    return this.httpClient.put(this.global.address + 'reservations/add', reservation) as Observable<any>;
  }
}
