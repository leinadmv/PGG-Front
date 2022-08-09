import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisualService } from 'src/app/service/rest/visual.service';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = true;

  displayedColumns: string[] = [];
  dataSource =  new MatTableDataSource<any>();

  constructor(private router: Router , public visualService: VisualService) { }

  ngOnInit(): void {
    this.visualService.changeColor('gris');
  }

}
