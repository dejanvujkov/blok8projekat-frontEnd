import { Component, OnInit } from '@angular/core';
import {RACServiceService} from '../service/racservice.service';
import {Global} from '../global';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  myServices: any;
  constructor(private racService: RACServiceService, private global: Global, private sanitizer: DomSanitizer) {
    this.getAllMyServices();
  }

  ngOnInit() {
  }

  getAllMyServices() {
    const x = this.racService.getAllMyServices(this.global.user.AppUser.Id);
    x.subscribe(
      result => {
        this.myServices = result;
      },
      err => {
        alert('Error getting my services');
      }
    );
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
