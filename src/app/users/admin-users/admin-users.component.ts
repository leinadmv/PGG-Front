import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/service/rest/users.service';
import {ThemePalette} from '@angular/material/core';
import Swal from 'sweetalert2';
import { VisualService } from 'src/app/service/rest/visual.service';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = true;

  displayedColumns: string[] = ['accion', 'estado', 'firstName', 'fkDocumentType', 'documentNumber', 'email', 'phone', 'position', 'business', 'idRole' ];
  dataSource =  new MatTableDataSource<any>();
  // 'middleName', 'firstLastname', 'secondLastname',
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router , public service : UsersService, public dialog: MatDialog, public visualService: VisualService ) { }


  ngOnInit(): void {

    this.getUsers();
    this.visualService.changeColor('gris');
    
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

  changeState(id: any, state: any){

    if(state === 1){
      state = 0;
    } else if (state === 0) {
      state = 1;
    }

    const estado = new FormData();
		estado.append('id', id);
		estado.append('state', state);

    this.service.changeState(estado).subscribe(resp => {

      Swal.fire(
        'Editado!',
        resp.message,
         'success'
       )

    });



  }

  Change(){
      const dialogRef = this.dialog.open(ChangePasswordComponent,{
        width: '50%',
        panelClass: 'custom-dialog-container',
      });
    }
  }







