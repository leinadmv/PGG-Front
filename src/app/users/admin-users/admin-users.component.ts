import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUsersComponent } from '../create-users/create-users.component'; 
import { UsersService } from 'src/app/service/rest/users.service';
import { MatIconModule } from '@angular/material/icon';
import {ThemePalette} from '@angular/material/core';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  
  color: ThemePalette = 'accent';
  checked = true;
 

  displayedColumns: string[] = ['accion', 'Estado', 'firstName', 'fkDocumentType', 'documentNumber', 'email', 'phone', 'position', 'business', 'idRole' ];
  dataSource =  new MatTableDataSource<any>();
  // 'middleName', 'firstLastname', 'secondLastname',
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router , public service : UsersService, ) { }


  ngOnInit(): void {

    this.getUsers();
    
  }

  getUsers() {
    this.service.getUsers().subscribe((resp) => {
      this.dataSource.data = resp.data.users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  Redirect(row?: any){

    if(row){
      this.service.createOrEdit('editar', 'Editar usuario', row);
      this.router.navigate(['/create-users']);
    } else {
      this.service.createOrEdit('crear', 'Crear usuario');
      this.router.navigate(['/create-users']);
    }

  }


}





