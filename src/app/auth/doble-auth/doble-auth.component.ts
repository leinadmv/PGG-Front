import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doble-auth',
  templateUrl: './doble-auth.component.html',
  styleUrls: ['./doble-auth.component.css']
})
export class DobleAuthComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {

    this.router.navigate(['/']);
  }

}
