import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ImageService} from '../service/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Global} from '../global'
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
  constructor(private sanitizer:DomSanitizer,
             private accountService: AccountService,
             private imageService: ImageService,
             private global: Global)
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
      this.user.AppUser.ImagePath = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnUploadImageSubmit(Image, user){
    console.log("slika: " + Image);
    this.imageService.postFile(this.fileToUpload, user.AppUser.Id).subscribe(
      data =>{
        console.log('done');
        user.AppUser.ImagePath = data;
      },
      err =>{
        console.log('err in uploadImg');
      }

    );
   }

  getAccountDetails() {
    this.user = this.global.user;
  }
}
