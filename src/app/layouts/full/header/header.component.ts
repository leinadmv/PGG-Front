import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/rest/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private service: AuthService, private router: Router) {
    
  }

  logOut(){

    this.service.logOut().subscribe(resp =>{
      localStorage.clear();
      this.router.navigate(['/login']);
    })

  }

}
