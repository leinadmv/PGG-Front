import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from 'src/app/service/rest/business.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DynamicTableComponent implements OnInit, OnChanges {

  @Input() Data: any;

  displayedColumns: string[] = [];
  dataSource =  new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private busineesService: BusinessService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawTable(changes.Data);
  }

  drawTable(data:any){
    console.log(data);
    this.displayedColumns = data?.currentValue?.data?.table?.encabezados;
    this.dataSource.data = data?.currentValue?.data?.table?.data;
  }

  isArray(obj : any ) {
    return !Array.isArray(obj)
 }

 editarForm(form: any){

  this.router.navigate(['/app/create-business']);
  form['accion'] = 'editar';
  this.busineesService.createBusiness(form);
 
}

}
