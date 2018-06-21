import { Component, OnInit } from '@angular/core';
import {Global} from '../global';
import {ServiceModel} from '../model/ServiceModel';
import {RACServiceService} from '../service/racservice.service';
import {ImageService} from '../service/image.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  imageUrl: string;
  fileToUpload: File;
  constructor(private global: Global, private rac: RACServiceService, private imageService: ImageService) { }
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

  AddNewService(value: ServiceModel, form) {
    this.rac.addNewService(value, this.fileToUpload);
  }
}
