import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/rest/users.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  band: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.userService.getUserWhitToken().subscribe(resp => {
      
      this.userService.createOrEdit('ver', 'Ver Usuario', resp.data.user);
      this.band = true;

    })

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded(image?: LoadedImage) {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}



}
