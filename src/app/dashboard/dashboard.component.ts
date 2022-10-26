import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../service/rest/users.service';
import { VisualService } from '../service/rest/visual.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {

	notificaciones: any = [];

	displayedColumns: string[] = ['categoria', 'tipo', 'nombre', 'accion'];
  	dataSource =  new MatTableDataSource<any>();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private visualService: VisualService, public userService: UsersService){
		this.visualService.changeColor('principal');
	}

	ngOnInit(): void {
		this.userService.getUserWhitToken().subscribe(resp =>{
			this.notificaciones = resp.data.notifications;
			this.dataSource.data = resp.data.lastUpdatesCategpries;
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}
	
}
