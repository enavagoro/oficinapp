import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../_servicios/cliente.service';

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
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.page.html',
  styleUrls: ['./reporte-clientes.page.scss'],
})
export class ReporteClientesPage implements OnInit {

  clientes = [];

  constructor(public clienteService:ClienteService) { }

  ngOnInit() {
    this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
          this.clientes = c.filter(this.filtros);
          console.log('clientes',this.clientes);
        })
    })


  }

  filtros(venta){
    if(venta.estado == 1){
      return true;
    }
    return false;

  }
}
