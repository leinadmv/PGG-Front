import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {


  postForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public service : AdminService ) { }


  ngOnInit(): void {

    this.formControl();

    this.setEdit();

   }

   get error(): any { return this.postForm.controls; }
  }

}
