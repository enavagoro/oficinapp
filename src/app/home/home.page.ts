import { Component, Directive, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
import { ProductoService } from '../_servicios/producto.service';
import { GastoService } from '../_servicios/gasto.service';
import { VentaService } from '../_servicios/venta.service';
import { ClienteService } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';
import { TipoGastoService } from '../_servicios/tipo-gasto.service';
import { NotificationService } from '../_servicios/notification.service';
import { Storage } from '@ionic/storage';
import * as jsPDF from 'jspdf';
import { Chart } from "chart.js";
import { Router } from '@angular/router';

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
  ApexLegend
} from "ng-apexcharts";
// @ts-ignore
import ApexCharts from 'apexcharts';

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
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  tipoActual = "bar";

  productos = [];
  gastos = [];
  clientes = [];
  ventas = [];

  ventasMensuales = {"valor":Number(null),"cantidad":Number(null)};
  ventasAnuales = {"valor":Number(null),"cantidad":Number(null)};
  ventasTotales = {"valor":Number(null),"cantidad":Number(null)};

  gastosMensuales = {"valor":Number(null),"cantidad":Number(null)};
  gastosAnuales = {"valor":Number(null),"cantidad":Number(null)};
  gastosTotales = {"valor":Number(null),"cantidad":Number(null)};
  gastoMayor = {"monto":Number(null)};
  productoMayor = {"cantidad":Number(null)};


  detalles = [];
  listaProductos = [];
  listaGastos = [];
  labels = [];
  valores = [];
  tiposGastos = [];

  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"];
  private chart1: Chart;

  arreglo1 = [Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null)];
  arreglo2 = [Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null), Number(null)];

  @ViewChild("apexchart",{static: false}) chartApex: ChartComponent;
  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;
  @ViewChild("chartCanvas",{static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(public notif : NotificationService,public router:Router,public storage:Storage,public tService :TipoGastoService,public cService:ClienteService,public gService:GastoService,public pService : ProductoService, public vService:VentaService, public dService:DetalleService) {

    let fechai = "2020-06-01";
    let fechaf = "2020-06-27";
    console.log(fechai)
    var fechasChart = [];
    var gastosChart = [];
    var ventasChart = [];

    //console.log("constructor");


    var menu = document.querySelector('ion-menu')
    menu.hidden = false;

  }

  ngOnInit(){
    var fechaTemporal = 0;
    let fecha = new Date();

    this.vService.listar().then(servicio=>{
      servicio.subscribe(v=>{
          this.ventas = v.filter(this.filtros);

          for(var venta of this.ventas){
            let fechaTemporal = new Date(venta.fecha);
            /*
            console.log('fecha venta:', fechaTemporal);
            console.log('fecha hoy',fecha);
            */
            this.rellenarValoresGrafico(venta,'venta');

            if(fechaTemporal.getMonth()==fecha.getMonth() && fechaTemporal.getFullYear()==fecha.getFullYear()){
              this.ventasMensuales.cantidad++;
              //calculos
              this.calculoValorVenta(venta,'mes');
            }
            if(fechaTemporal.getFullYear()==fecha.getFullYear()){
              this.ventasAnuales.cantidad++;
              //calculos
              this.calculoValorVenta(venta,'año');
            }

            this.productoMasVendido(venta);
          }

        })

    })

    this.gService.listar().then(servicio=>{
      servicio.subscribe(g=>{
          this.gastos = g.filter(this.filtros);

          for(var gasto of this.gastos){
            this.rellenarValoresGrafico(gasto,'gasto');
            let fechaTemporal = new Date(gasto.fecha);
            if(fechaTemporal.getMonth()==fecha.getMonth() && fechaTemporal.getFullYear()==fecha.getFullYear()){
              this.gastosMensuales.cantidad++;

              //calculos
              this.gastosMensuales.valor += gasto.monto;
            }
            if(fechaTemporal.getFullYear()==fecha.getFullYear()){
              this.gastosAnuales.cantidad++;

              //calculos
              this.gastosAnuales.valor += gasto.monto;
            }
            if(gasto.monto > this.gastoMayor.monto){
              this.gastoMayor = gasto;
            }
          }
      })
    })

    this.pService.listar().then(servicio=>{
      servicio.subscribe(ps =>{
        this.productos = ps.filter(this.filtros);
        console.log('productos',this.productos);
      })
    })

    this.cService.listar().then(servicio=>{
      servicio.subscribe(c=>{
          this.clientes = c.filter(this.filtros);
      })
    })


    this.chartOptions = {
      series: [
        {
          name: "Ventas",
          data: this.arreglo1
        },
        {
          name: "Gastos",
          data: this.arreglo2
        },
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        style: {
          colors: ['#039be5', '#f44336']
        }
      },
      colors: ["#039be5", "#f44336"],
      stroke: {
        width: 5,
        curve: "smooth",
        dashArray: [0, 8, 5]
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false

        },
        categories: []
      },
    tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " del mes ";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " del mes";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

  mostrarNot(){
    this.notif.mostrarNotificacion("Gracias por permitir notificaciones!");
  }
  filtros(gasto){
    if(gasto.estado == 1){
      return true;
    }
    return false;
  }
  ngAfterViewInit(){
    try {
      var htmlChart = document.querySelector('#apexchart');
      if(htmlChart){
        var chart = new ApexCharts(htmlChart, this.chartOptions);
        chart.render();
      }
    } catch (error) {
      console.log(error)
    }

    //this.chartOptions.chart.render();
  //  this.chartOptions.chart.toggleSeries("series-1");
  }

  productoMasVendido(producto){

    if(producto.cantidad > this.productoMayor.cantidad){
      this.productoMayor = producto;
    }
/*
    var mayor = 0;
    var p = "No hay vendidos";
    this.labels = []
    this.valores = []
    for(let producto in this.listaProductos){
      if(producto){
        this.labels.push(producto)
        this.valores.push(this.listaProductos[producto])
        if(this.listaProductos[producto] > mayor){
          mayor = this.listaProductos[producto];
          p = producto;
        }
      }
    }

    return p+" vendido "+mayor+" veces";
*/
  }
/*
  gastoMasRecurrente(){
    var mayor = 0;
    var g = " No hay gastos";
    for(let gasto in this.listaGastos){
      if(this.listaGastos[gasto] > mayor){
        mayor = this.listaGastos[gasto];
        g = gasto;
      }
    }
    return g+" gastado "+mayor+" veces";
  }
  filtrarVentaMes(){
    console.log('entre a la venta del mes');
    let mes= new Date();
    let arregloTemporal = [];
    let fechaTemporal = new Date();

    for (let i = 0; i<this.ventas.length; i++)
    {
      fechaTemporal = new Date(this.ventas[i].fecha);

      if(fechaTemporal.getMonth()==mes.getMonth() && fechaTemporal.getFullYear()==mes.getFullYear()){
        arregloTemporal.push(this.ventas[i]);
      }
    }
    return arregloTemporal.length;
  }
  filtrarVentaYear(){
    let año= new Date();
    let arregloTemporal = [];
    let fechaTemporal = new Date();

    for (let i = 0; i<this.ventas.length; i++)
    {
      fechaTemporal = new Date(this.ventas[i].fecha);

      if(fechaTemporal.getFullYear()==año.getFullYear()){
        arregloTemporal.push(this.ventas[i]);
      }
    }
    return arregloTemporal.length;
  }
  filtrarProductoVendido(){
    let arregloTemporal = [];


    for (let i = 0; i<this.detalles.length; i++)
    {
      //console.log('detalle:',this.detalles[i]);
    }
  }
*/
  calculoValorVenta(venta,tipo){
    for(var d of venta.detalle){
      if(tipo=='mes'){
        this.ventasMensuales.valor += d.precio * d.cantidad;
      }
      if(tipo=='año'){
        this.ventasAnuales.valor += d.precio * d.cantidad;
      }
      this.productoMasVendido(d);
    }

  }


  addActivos(original,arr){
    for(let i = 0 ; i < arr.length ; i++){
      if(arr[i].estado == 1){
        original.push(arr[i]);
      }
    }
  }
  deslogear(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + (r().toFixed(1) + 1) + ')';
    //console.log(rgb)
    return rgb;
  }

  rellenarValoresGrafico(dato,tipo){
    console.log('dato',dato);
    let fechaTemporal = new Date(dato.fecha);

    if(tipo=='venta'){
      let valorVenta = Number(null);

      for(var d of dato.detalle){
        valorVenta += d.cantidad * d.precio;
      }
        this.arreglo1[fechaTemporal.getMonth()]+=valorVenta;
      }
      if(tipo=='gasto'){
        this.arreglo2[fechaTemporal.getMonth()]+=dato.monto;
      }
  }

  dibujarGrafico(){
    //console.log("dibujao");
    if(this.labels.length == 0){
      return ;
    }
    var valores = [];
    var labels = [];
    for(let producto in this.listaProductos){
      valores.push(this.listaProductos[producto]);
      labels.push(producto);
    }

    let arr = [];
    let background = ["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"];
    let bordes = ["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"];
    let backgroundColors = [background[0],background[1],background[2],background[3]];
    let bordesColors = [bordes[0],bordes[1],bordes[2],bordes[3]];

    if(this.chart1){
      this.chart1.destroy();
    }

    this.chart1 = new Chart(this.radarCanvas.nativeElement,{
        type:this.tipoActual,
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ventas por producto',
              data: valores,
              backgroundColor:backgroundColors,
              borderColor: bordesColors,
               borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                  }
              }
            ]
          }
        }
    });
  }
}
