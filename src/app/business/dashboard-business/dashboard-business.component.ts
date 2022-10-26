import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { BusinessService } from 'src/app/service/rest/business.service';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}

@Component({
  selector: 'app-dashboard-business',
  templateUrl: './dashboard-business.component.html',
  styleUrls: ['./dashboard-business.component.css']
})
export class DashboardBusinessComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);
  public VisitorChartOptions: Partial<VisitorChartOptions>;

  notificaciones: any = [];
  tabla: any;
  idCategories: any;
  tablaVar: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: BusinessService) { 

    this.chartOptions = {
      series: [
        {
          name: "Pixel",
          data: [44, 55, 57, 56, 61, 58],
        },
        {
          name: "Ample",
          data: [76, 85, 101, 98, 87, 105],
        },
      ],
      chart: {
        type: "bar",
        fontFamily: "Poppins,sans-serif",
        height: 320,
      },
      grid: {
        borderColor: "rgba(0,0,0,.2)",
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ["#26c6da", "#1e88e5"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };

    this.VisitorChartOptions = {
      series: [45, 15, 27, 18],
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 253,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80px",
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["Mobile", "Tablet", "Desktop", "Other"],
      colors: ["#1e88e5", "#26c6da", "#745af2", "#eceff1"],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };

  }

  ngOnInit(): void {
    this.idCategories = this.route.snapshot.paramMap.get('id');

    this.service.informeCategoria(this.idCategories).subscribe(resp =>{
      console.log(resp)
      this.notificaciones = resp.data.notifications;
      this.tabla = resp;
      this.tablaVar = true;
    })
  }

  routerAdmin(){
    this.router.navigate(['/app/admin-business/'+this.idCategories]);
  }

}
