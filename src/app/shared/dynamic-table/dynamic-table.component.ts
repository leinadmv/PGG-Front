import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawTable(changes.Data);
  }

  drawTable(data:any){
    this.displayedColumns = data?.currentValue?.data?.table?.encabezados;
    this.dataSource.data = data?.currentValue?.data?.data;
  }

}
