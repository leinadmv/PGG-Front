import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from 'src/app/service/rest/business.service';
import { VisualService } from 'src/app/service/rest/visual.service';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.css']
})
export class AdminBusinessComponent implements OnInit {

  color: any;
  infoBusiness: any;

  constructor(private route: ActivatedRoute, private busineesService: BusinessService, public visualService: VisualService) { }

  ngOnInit(): void {

    this.color = localStorage.getItem('color');
    this.visualService.changeColor(this.color);

    const id = this.route.snapshot.paramMap.get('id');

    const idCategorie = new FormData();
		idCategorie.append('idCategorie', id);

    this.busineesService.getBusiness(idCategorie).subscribe(resp => {
      this.infoBusiness = resp;
    });

  }

}
