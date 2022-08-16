import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/rest/users.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  band: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  image: any = '';

  constructor(private userService: UsersService) { 

  }

  ngOnInit() {

    this.userService.getUserWhitToken().subscribe(async resp => {
      
      this.userService.createOrEdit('ver', 'Ver Usuario', resp.data.user);
      this.band = true;
      this.image = await this.b64toBlob(resp.data.user.users_photo.photo);

    })

  }

  async b64toBlob(b64Data) {
    const r = await fetch(b64Data);
    const blob = await r.blob();
    return blob;
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

updatePhoto() {

  const foto = new FormData();
	foto.append('photo', this.croppedImage);

  this.userService.saveupPhoto(foto).subscribe((resp) => {

    this.userService.headPhoto$.next(this.croppedImage);
    
    Swal.fire(
      'Editado!',
      resp.message,
       'success'
     )
  }, error=>{

    Swal.fire({
      icon: 'error',
      title: 'No se ha podido subir su imagen!',
      text: 'Verifique que el tamaño o la resolucion de la imagen no sea demasiado grande',
    })
  });
}

}
