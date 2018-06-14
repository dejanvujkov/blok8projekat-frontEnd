import { Injectable } from '@angular/core';
import { ReservationModel } from '../model/ReservationModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) {}

  addReservation(reservation: ReservationModel){
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    return this.httpClient.put('http://localhost:51680/reservations/add', reservation) as Observable<any>;
  }
}
