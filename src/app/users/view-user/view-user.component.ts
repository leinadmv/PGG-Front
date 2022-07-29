import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/rest/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.userService.getUserWhitToken().subscribe(resp => {
      
      this.userService.createOrEdit('ver', 'Ver Usuario', resp.data.user);

    })

  }

}
