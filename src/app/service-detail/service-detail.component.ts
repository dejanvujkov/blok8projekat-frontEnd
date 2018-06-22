import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RACServiceService} from '../service/racservice.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { ReservationModel } from '../model/ReservationModel';
import {ReservationService} from '../service/reservation.service';
import {Global} from '../global';
import { MapInfo } from '../model/MapInfo';
import {DomSanitizer} from '@angular/platform-browser';

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
  offices: Array<MapInfo> = new Array<MapInfo>();
  comments: any = null;
  Id: number;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;
  selectedVehicleId: number = -1;
  selectedBranchOfficeFromId: number = -1;
  selectedBranchOfficeToId: number = -1;
  address1 = "";
  address2 = "";

  rate = 0;
  
  infoMessage: Array<string>;
  commentInfoMessage: string;

  constructor(private sanitizer:DomSanitizer, private reservationService: ReservationService, private racService: RACServiceService, private router: Router, private activatedRoute: ActivatedRoute, private calendar: NgbCalendar, private global: Global) {
    activatedRoute.params.subscribe(params => {this.Id = params['Id']; });
    this.getService(this.Id);
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.getComments();
    this.commentInfoMessage = "";
    this.infoMessage = null;
  }

  ngOnInit() {
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getComments(){
    let retVal = this.racService.getComments(this.Id);
    retVal.subscribe(
      data => {
        this.comments = data;
        console.log(data);
      },
      err=>{
        console.log("err get comment");
      }
    );
  }

  sendComment(textarea: HTMLTextAreaElement){
    let retVal = this.racService.sendComment(textarea.value, this.Service.Id);
    retVal.subscribe(
      data=>{
        console.log("ok sedn coment");
        this.commentInfoMessage = "Your comment is sent to server";
        textarea.value = "";
      },
      err=>{
        console.log("err send comment");
      }

    );
  }

  isUserLogged(){
    if(localStorage.jwt){
      return true;
    }
    return false;
  }

  rated($event){
    this.rate = $event;
    console.log("Rate: " + this.rate);
    let retval = this.racService.rateService(this.Service.Id, this.rate);
    retval.subscribe(
      data=>{
        console.log('ok rating');
        this.Service.Rate = data;
      },
      err=>{
        console.log('err in rating');
      }
    )
  }

  registerTakeChangedEvent($event){
    this.selectedBranchOfficeFromId = $event;
    console.log("event-take: " + this.selectedBranchOfficeFromId);
    if(this.selectedBranchOfficeFromId == -1){
      this.address1 = "";
      var x = document.getElementById("b1").hidden = true;
    }
    this.Service.Offices.forEach(office => {
      if(office.Id == this.selectedBranchOfficeFromId){
        this.address1 = office.Address;
        var x = document.getElementById("b1").hidden = false;
        return;
      }
    });
  }

  registerReturnChangedEvent($event){
    this.selectedBranchOfficeToId = $event;
    console.log("event-ret: " + this.selectedBranchOfficeToId);
    if(this.selectedBranchOfficeToId == -1){
      this.address2 = "";
      var x = document.getElementById("b2").hidden = true;
    }
    this.Service.Offices.forEach(office => {
      if(office.Id == this.selectedBranchOfficeToId){
        this.address2 = office.Address;
        var x = document.getElementById("b2").hidden = false;
        return;
      }
    });
  }

  deleteSelectedTakeOffice(){
    this.selectedBranchOfficeFromId = -1;
    this.address1="";
    var x = document.getElementById("b1").hidden = true;
  }

  deleteSelectedReturnOffice(){
    this.selectedBranchOfficeToId = -1; 
    this.address2="";  
    var x = document.getElementById("b2").hidden = true;
  }

  getService(id: number) {
    const x = this.racService.getService(id);
    x.subscribe(
      result => {
        this.Service = result;
        this.Service.Offices.forEach(office => {
          this.offices.push(new MapInfo(office.Id, office.Latitude, office.Longitude, "", office.Address, ""));
        });
      },
      err => {
        console.log('Error getting service');
      }
    );
  }

  onVehicleListItemClick(i: number, list ) {
    if(this.global.user==null){
      return;
    }
    if (this.global.user.AppUser.ImagePath == null || this.global.user.AppUser.Approved == 'false') {
      alert('Morate prvo da dovrsite nalog da biste mogli da rezervisete vozilo');
      return;
    }
    (list.children[i] as HTMLDivElement).style.background = 'LightBlue';
    for (const child of list.children) {
      if (child !== list.children[i]) {
        child.style.background = '';
      }
    }

    this.selectedVehicleId = this.Service.Vehicles[i].Id;
  }
  /*
  onBranchOfficeFromListItemClick(i: number, list) {
    if (this.global.user.AppUser.ImagePath != null || this.global.user.AppUser.Approved == 'false') {
      alert('Morate prvo da dovrsite nalog da biste mogli da rezervisete vozilo');
      return;
    }
    (list.children[i] as HTMLDivElement).style.background = 'LightBlue';
    for ( const child of list.children) {
      if (child !== list.children[i]) {
        child.style.background = '';
      }
    }

    this.selectedBranchOfficeFromId = this.Service.Offices[i].Id;
  }

  onBranchOfficeToListItemClick(i: number, list) {
    if (this.global.user.AppUser.ImagePath != null || this.global.user.AppUser.Approved == 'false') {
      alert('Morate prvo da dovrsite nalog da biste mogli da rezervisete vozilo');
      return;
    }
    (list.children[i] as HTMLDivElement).style.background = 'LightBlue';
    for (const child of list.children) {
      if (child !== list.children[i]) {
        child.style.background = '';
      }
    }

    this.selectedBranchOfficeToId = this.Service.Offices[i].Id;
  }*/

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
    if (this.global.user.AppUser.ImagePath == null || this.global.user.AppUser.Approved == 'false') {
      alert('Morate prvo da dovrsite nalog da biste mogli da rezervisete vozilo');
      return;
    }
    if(this.selectedVehicleId == -1 || this.selectedBranchOfficeToId == -1 ||
       this.selectedBranchOfficeFromId == -1 || this.toDate==null || this.fromDate==null){
         alert("Niste popunili sve podatke potrebne za rezervaciju");
         return;
       }
    const reservation: ReservationModel = new ReservationModel();
    reservation.ServiceId = this.Service.Id;
    reservation.ReturnBranchOfficeId = this.selectedBranchOfficeToId;
    reservation.TakeAwayBranchOfficeId = this.selectedBranchOfficeFromId;
    reservation.TimeTo = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1);
    reservation.TimeFrom = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1);
    reservation.UserId = 1;
    reservation.VehicleId = this.selectedVehicleId;

    const retVal = this.reservationService.addReservation(reservation);
    retVal.subscribe(
      result => {
        if(result == null){
          alert('Success reservation');
          this.infoMessage = null;
        }else{
          this.infoMessage = new Array<string>();
          let message: string;
          result.forEach(date => {
            message = date.Start.split("T")[0] + " - " + date.End.split("T")[0];          
            this.infoMessage.push(message);
          });
          alert(message);
          console.log(result);
          
        }
      },
      err => {
        alert('Can\'t make a reservation');
      }
    );
  }
}
