import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RACServiceService} from '../service/racservice.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { ReservationModel } from '../model/ReservationModel';
import {ReservationService} from '../service/reservation.service';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class ServiceDetailComponent implements OnInit {

  Service: any;
  Id: number;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;
  selectedVehicleId: number;
  selectedBranchOfficeFromId: number;
  selectedBranchOfficeToId: number;

  constructor(private reservationService: ReservationService, private racService: RACServiceService, private router: Router, private activatedRoute: ActivatedRoute, private calendar: NgbCalendar) {
    activatedRoute.params.subscribe(params => {this.Id = params['Id']; });
    this.getService(this.Id);
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  getService(id: number) {
    const x = this.racService.getService(id);
    x.subscribe(
      result => {
        this.Service = result;
      },
      err => {
        console.log('Error getting service');
      }
    );
  }

  onVehicleListItemClick(i:number, list: HTMLDivElement ){
    //console.log("aaaa: "  list.children[i].style.background);
    (list.children[i] as HTMLDivElement).style.background = "LightBlue";
    for(let child of list.children){
      if(child != list.children[i]){
        child.style.background = "";
      }
    }

    this.selectedVehicleId = this.Service.Vehicles[i].Id;
  }

  onBranchOfficeFromListItemClick(i:number, list: HTMLDivElement ){
    console.log("aaaa: " +  (list.children[i] as HTMLDivElement).style.background);
    (list.children[i] as HTMLDivElement).style.background = "LightBlue";
    for(let child of list.children){
      if(child != list.children[i]){
        child.style.background = "";
      }
    }

    this.selectedBranchOfficeFromId = this.Service.Offices[i].Id;
  }

  onBranchOfficeToListItemClick(i:number, list: HTMLDivElement ){
    console.log("aaaa: " +  (list.children[i] as HTMLDivElement).style.background);
    (list.children[i] as HTMLDivElement).style.background = "LightBlue";
    for(let child of list.children){
      if(child != list.children[i]){
        child.style.background = "";
      }
    }

    this.selectedBranchOfficeToId = this.Service.Offices[i].Id;
  }

  isUserLoggedIn() {
    return !localStorage.jwt;
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  makeReservation() {
    alert('from: ' + this.fromDate.day + 'to: ' + this.toDate.day + ' in ' + this.toDate.month);
    
    let reservation : ReservationModel = new ReservationModel();
    reservation.ServiceId = this.Service.Id;
    reservation.ReturnBranchOfficeId = this.selectedBranchOfficeToId
    reservation.TakeAwayBranchOfficeId = this.selectedBranchOfficeFromId;
    reservation.TimeTo = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1);
    reservation.TimeFrom = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1);
    reservation.UserId = 1;
    reservation.VehicleId = this.selectedVehicleId;

    let retVal = this.reservationService.addReservation(reservation);
    retVal.subscribe(
      result => {
        console.log('success reservation');
      },
      err => {
        console.log(err);
      }
    );

    /*
    fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;
  selectedVehicleId: number;
  selectedBranchOfficeId: number;*/
  }
}
