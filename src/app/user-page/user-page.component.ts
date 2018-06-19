import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ImageService} from '../service/image.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [ImageService]
})
export class UserPageComponent implements OnInit {
  user: any;
  imageUrl: string;
  fileToUpload: File = null;
  constructor(private sanitizer:DomSanitizer, private accountService: AccountService, private imageService: ImageService)
  {
    this.getAccountDetails();
  }

  ngOnInit() {
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnUploadImageSubmit(Image, user){
    this.imageService.postFile(this.fileToUpload, user).subscribe(
      data =>{
        console.log('done');
        //Image.value = null;
        //this.imageUrl = "/assets/img/default-image.png";
      },
      err =>{
        console.log('err in uploadImg');
      }

    );
   }

  getAccountDetails() {
    const username = localStorage.getItem('username');
    this.accountService.getAccountDetails(username);
    this.user = this.accountService.user;
  }
}
