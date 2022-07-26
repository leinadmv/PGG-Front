import { Component, OnInit } from '@angular/core';
import { PrintHook } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/service/rest/auth.service';
import { UsersService } from 'src/app/service/rest/users.service';
import Swal from 'sweetalert2';
import { photo } from './photo';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit {

  photoHeader: any

  constructor(private service: AuthService, private user: UsersService, private router: Router, public dialog: MatDialog){
    
  }

  
  ngOnInit(): void {

    this.user.getUserWhitToken().subscribe(resp => {
      if ( resp.data.user.users_photo){
        this.photoHeader = resp.data.user.users_photo.photo;
      } else {
        this.photoHeader = photo;
      }
      
    });


    this.user.headPhoto$.subscribe(resp =>{
      this.photoHeader = resp;
    })
     };

  logOut(){

    this.service.logOut().subscribe(resp =>{
      localStorage.clear();
      this.router.navigate(['/']);
    });error=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido deslogear!',
      })
    }

  }

  changePassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent,{
      width: '50%',
      panelClass: 'custom-dialog-container',
    });
  }

 
}
