import { Component, AfterViewInit } from '@angular/core';
import { VisualService } from '../service/rest/visual.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {

	constructor(private visualService: VisualService){
		this.visualService.changeColor('principal');
	}

	ngAfterViewInit() { }

}
