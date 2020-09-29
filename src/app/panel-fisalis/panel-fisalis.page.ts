import { Component, OnInit, ViewChild} from '@angular/core';
import { LoginService } from '../_servicios/login.service';
import { SucursalService } from '../_servicios/sucursales.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  fill: any;
  plotOptions: any;
  colors: string[];
};

export type RadioOptions ={
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}

@Component({
  selector: 'app-panel-fisalis',
  templateUrl: './panel-fisalis.page.html',
  styleUrls: ['./panel-fisalis.page.scss'],
})

export class PanelFisalisPage implements OnInit {
  sucursales = [];
  public options4 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},colors: [],plotOptions: {},dataLabels: {},xaxis: {} };

  constructor(private login : LoginService, private sucursalService : SucursalService) { }

  ngOnInit() {
    this.login.getFirstTimeEmpresa().then(val=>{
      console.log(val);
      this.sucursalService.listar().subscribe(s=>{
        this.sucursales = s;
        console.log(this.sucursales);
      })
    })

    this.renderizarGraficos();
  }

  ngAfterViewInit(){
    this.options4 = {
      series: [
        {
          name: "Ingresos",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "Egresos",
          data: [13, 23, 20, 8, 13, 27]
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "Sucursal 1",
          "Sucursal 2",
          "Sucursal 3",
          "Sucursal 4",
          "Sucursal 5",
          "Sucursal 6"
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };

/*
    this.options4 = {
      chart: {
        type: "area",
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: "Gastos del Mes ($)",
          data: [1,2,3,4,5,6,7]
        }
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul"
        ]
      }
    };
*/
    try {
      var apex4 = document.querySelector('#chart4');
    if(apex4){
        var chart = new ApexCharts(apex4, this.options4);
        chart.render();
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderizarGraficos(){
    this.ngAfterViewInit();
  }

}
