import { Component, OnInit, ViewChild } from '@angular/core';
import { GastoService } from '../../_servicios/gasto.service';
import { TipoGastoService } from '../../_servicios/tipo-gasto.service';

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
  selector: 'app-reporte-gastos',
  templateUrl: './reporte-gastos.page.html',
  styleUrls: ['./reporte-gastos.page.scss'],
})
export class ReporteGastosPage implements OnInit {

  public options1 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},stroke: {},tooltip: {}};
  public options2 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},stroke: {},tooltip: {}};
  public options3 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},stroke: {},tooltip: {}};
  public options4 : Partial<ChartOptions> = {series: [],chart: {type: 'area'},colors: [],plotOptions: {},dataLabels: {},xaxis: {} };
  public options5 : Partial<ChartOptions> = {series: [],chart: {type: 'bar'},colors: [],plotOptions: {},dataLabels: {},legend:{}, grid:{}, xaxis: {}, yaxis: {} };
  public options7 : Partial<RadioOptions> = {series: [],chart: {type: 'pie'},labels: []};

  gastos = [];
  tiposGastos = [];

  gastosAnuales = {"valor":Number(null),"cantidad":Number(null),"meses":[Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null)]};
  gastosMensuales = {"valor":Number(null),"cantidad":Number(null), "dias":[]};
  mesEnCurso = [];
  sieteUltimosDias = [];
  sieteUltimosDiasValor = Number(null);
  gastosMasAltos = {"titulos":[],"valor":[]};

  documentoMasUtilizado = {"nombres":['Boleta','Factura'],"cantidad":[Number(null),Number(null)]};

  constructor(public gastoService:GastoService, public tipoGastoService:TipoGastoService) {

   }

  ngOnInit() {
    var fecha = new Date();

    this.tipoGastoService.listar().then(servicio=>{
      servicio.subscribe(t=>{
      this.tiposGastos = t.filter(this.filtros);
      })
    })

    this.gastoService.listar().then(servicio=>{
      servicio.subscribe(g=>{
      this.mesEnCurso = g.filter(this.filterByCurrentMonth);

      this.gastos = g.filter(this.filtros);
      console.log('gastos',this.gastos);
      console.log('tipos gasto',this.tiposGastos);

        for(var gasto of this.gastos){

          let fechaTemporal = new Date(gasto.fecha);

          if(fechaTemporal.getMonth()==fecha.getMonth() && fechaTemporal.getFullYear()==fecha.getFullYear()){
            this.gastosMensuales.valor+=gasto.monto;
            this.gastosMensuales.cantidad++;
          }
          if(fechaTemporal.getFullYear()==fecha.getFullYear()){
            this.gastosAnuales.valor+=gasto.monto;
            this.gastosAnuales.meses[fechaTemporal.getMonth()]+=gasto.monto;
            this.gastosAnuales.cantidad++;

            if(gasto.documento==0){
              this.documentoMasUtilizado.cantidad[0]++;
            }
            if(gasto.documento==1){
              this.documentoMasUtilizado.cantidad[1]++;
            }
          }
        }
        console.log('documento mas utilizado',this.documentoMasUtilizado);
        for(var i  = 0  ; i < 31 ;i ++){
          if(!this.gastosMensuales.dias[i]){
            this.gastosMensuales.dias[i] = 0;
          }
        }
        for(var gasto of this.mesEnCurso){
          var f = new Date(gasto.fecha)
          var dia = f.getDate()
          this.gastosMensuales.dias[dia]+=gasto.monto;
        }

        for(var i = 7; i > 0 ; i-- ){
          var f = new Date();
          var dia = f.getDate();
          if(this.gastosMensuales.dias[dia - i] && (dia - i) >= 0){
            this.sieteUltimosDias.push(this.gastosMensuales.dias[dia - i])
            this.sieteUltimosDiasValor+=this.gastosMensuales.dias[dia - i];
          }else{
            this.sieteUltimosDias.push(0);
          }
        }

        var gastosOrdenados = this.gastos;
        gastosOrdenados.sort(function (a,b) {
          if(a.monto < b.monto){
            return 1;
          }
          if(a.monto > b.monto){
            return -1;
          }
          return 0;
        })

        for(let i=0; i<7; i++){
          this.gastosMasAltos.valor.push(0);
        }

        for(let i=0; i<gastosOrdenados.length; i++){
          if(i<7){
            this.gastosMasAltos.valor[i] = gastosOrdenados[i].monto;
            this.gastosMasAltos.titulos[i] = gastosOrdenados[i].titulo/*.substring(0,10)*/;
          }
        }
        console.log('gastos mas altos',this.gastosMasAltos);

  //      for(let i=0; i<)
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

    this.options2 = {
      series: [{
      data: this.gastosMensuales.dias
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
      data: this.gastosAnuales.meses
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
          data: this.gastosAnuales.meses
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

    try {
      var apex1 = document.querySelector('#chart1');
      var apex2 = document.querySelector('#chart2');
      var apex3 = document.querySelector('#chart3');
      var apex4 = document.querySelector('#chart4');
      var apex5 = document.querySelector('#chart5');
      var apex6 = document.querySelector('#chart6');
      var apex7 = document.querySelector('#chart7');
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
      if(apex5){
        var chart = new ApexCharts(apex5, this.options5);
        chart.render();
      }
      /*
      if(apex6){
        var chart = new ApexCharts(apex6, this.options6);
        chart.render();
      }
      */
      if(apex7){
        var chart = new ApexCharts(apex7, this.options7);
        chart.render();
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderizarGraficos(){
    this.ngAfterViewInit();
  }

  filterByCurrentMonth(gasto){
    let mesActual = new Date().getMonth()
    let fecha = new Date(gasto.fecha);
    let mes = fecha.getMonth();
    return mes == mesActual;
  }

  filtros(gasto){
    if(gasto.estado){
      return true;
    }
    return false;
  }

}
