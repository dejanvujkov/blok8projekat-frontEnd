import { Component, OnInit } from '@angular/core';
import {OfficeModel} from '../model/OfficeModel';
import {RACServiceService} from '../service/racservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.css']
})
export class NewOfficeComponent implements OnInit {

  fileToUpload: File;
  imageUrl: string;
  serviceId: number;
  constructor(private rac: RACServiceService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['id'];
    });
  }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  AddNewOffice(office: OfficeModel, form) {
    office.ServiceId = this.serviceId;
    this.rac.addNewOffice(office, this.fileToUpload);
    form.reset();
  }
}
