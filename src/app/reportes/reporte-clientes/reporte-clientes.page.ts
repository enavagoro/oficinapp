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
  public options1 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},stroke: {},tooltip: {}};
  public options2 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},stroke: {},tooltip: {}};
  public options3 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},stroke: {},tooltip: {}};
  public options4 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},colors: [],plotOptions: {},dataLabels: {},xaxis: {} };

  clientes = [];

  clientesAnuales = {"cantidad":Number(null),"meses":[Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null)]};
  clientesMensuales = {"cantidad":Number(null),"dias":[]};
  mesEnCurso = [];
  sieteUltimosDias = [];
  sieteUltimosDiasValor = Number(null);

  constructor(public clienteService:ClienteService) { }

  ngOnInit() {
    var fecha = new Date();

    this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
          this.clientes = c.filter(this.filtros);
          console.log('clientes',this.clientes);
          this.mesEnCurso = this.clientes.filter(this.filterByCurrentMonth);
          for(var cliente of this.clientes){
            var fechaCreacion = new Date(cliente.createdAt);
            /*let fechaTemporal = new Date(gasto.fecha); */

            if(fechaCreacion.getMonth()==fecha.getMonth() && fechaCreacion.getFullYear()==fecha.getFullYear()){
              console.log('fui creado este mes',cliente);
              this.clientesMensuales.cantidad++;
            }
            if(fechaCreacion.getFullYear()==fecha.getFullYear()){
              this.clientesAnuales.cantidad++;
              this.clientesAnuales.meses[fechaCreacion.getMonth()]++;
            }
          }

          for(var i  = 0  ; i < 31 ;i ++){
            if(!this.clientesMensuales.dias[i]){
              this.clientesMensuales.dias[i] = 0;
            }
          }
          for(var cliente of this.mesEnCurso){
            var f = new Date(cliente.createdAt)
            var dia = f.getDate()
            this.clientesMensuales.dias[dia]++;
          }
          for(var i = 7; i > 0 ; i-- ){
            var f = new Date();
            var dia = f.getDate();
            if(this.clientesMensuales.dias[dia - i] && (dia - i) >= 0){
              this.sieteUltimosDias.push(this.clientesMensuales.dias[dia - i])
              this.sieteUltimosDiasValor++;
            }else{
              this.sieteUltimosDias.push(0);
            }
          }

        })
    })

    this.renderizarGraficos();
  }

  ngAfterViewInit(){

    this.options1 = {
      series: [{
      data: this.sieteUltimosDias
    }],
      chart: {
      type: 'area',
      height: 35,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
    };

    this.options2 = {
      series: [{
      data: this.clientesMensuales.dias
    }],
      chart: {
      type: 'area',
      height: 35,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
    };

    this.options3 = {
      series: [{
      data: this.clientesAnuales.meses
    }],
      chart: {
      type: 'area',
      height: 50,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
    };

    this.options4 = {
      chart: {
        type: "area",
        height: 250
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: "Gastos del Mes ($)",
          data: this.clientesAnuales.meses
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
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      }
    };
/*
    this.options5 = {
      series: [
        {
          name: "Monto del Gasto",
          data: this.gastosMasAltos.valor
        }
      ],
      chart: {
        height: 300,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.gastosMasAltos.titulos,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8",
              "#008FFB",
              "#00E396",
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        show: false,
      }
    };

    this.options7 = {
          series: this.documentoMasUtilizado.cantidad,
          chart: {
            type: "pie",
            height: 220
          },
          labels: this.documentoMasUtilizado.nombres
    };
*/
    try {
      var apex1 = document.querySelector('#chart1');
      var apex2 = document.querySelector('#chart2');
      var apex3 = document.querySelector('#chart3');
      var apex4 = document.querySelector('#chart4');
/*    var apex5 = document.querySelector('#chart5');
      var apex6 = document.querySelector('#chart6');
      var apex7 = document.querySelector('#chart7');
*/
      if(apex1){
        var chart = new ApexCharts(apex1, this.options1);
        chart.render();
      }
      if(apex2){
        var chart = new ApexCharts(apex2, this.options2);
        chart.render();
      }
      if(apex3){
        var chart = new ApexCharts(apex3, this.options3);
        chart.render();
      }
    if(apex4){
        var chart = new ApexCharts(apex4, this.options4);
        chart.render();
      }
      /*
      if(apex5){
        var chart = new ApexCharts(apex5, this.options5);
        chart.render();
      }
      /*
      if(apex6){
        var chart = new ApexCharts(apex6, this.options6);
        chart.render();
      }
      if(apex7){
        var chart = new ApexCharts(apex7, this.options7);
        chart.render();
      }
      */
    } catch (error) {
      console.log(error)
    }
  }

  renderizarGraficos(){
    this.ngAfterViewInit();
  }

  filterByCurrentMonth(cliente){
    let mesActual = new Date().getMonth()
    let fechaCreacion = new Date(cliente.createdAt);
    let mes = fechaCreacion.getMonth();
    return mes == mesActual;
  }

  filtros(venta){
    if(venta.estado == 1){
      return true;
    }
    return false;

  }
}
