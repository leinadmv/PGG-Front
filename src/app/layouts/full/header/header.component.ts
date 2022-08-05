import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/service/rest/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private service: AuthService, private router: Router, public dialog: MatDialog){
    
  }

  logOut(){

    this.service.logOut().subscribe(resp =>{
      localStorage.clear();
      this.router.navigate(['/login']);
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
