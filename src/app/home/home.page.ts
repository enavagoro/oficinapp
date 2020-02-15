import { Component, Directive, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductoService } from '../_servicios/producto.service';
import { GastoService } from '../_servicios/gasto.service';
import { VentaService } from '../_servicios/venta.service';
import { ClienteService } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';

import * as jsPDF from 'jspdf';
import { Chart } from "chart.js";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


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
  detalles = [];
  listaProductos = [];
  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"];
  private chart1: Chart;

  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;


  constructor(public cService:ClienteService,public gService:GastoService,public pService : ProductoService, public vService:VentaService, public dService:DetalleService) {

    pService.listar().subscribe(ps =>{
      this.addActivos(this.productos,ps)
    })
    gService.listar().subscribe(gs=>{
      this.addActivos(this.gastos,gs)
    })
    cService.listar().subscribe(cs=>{
      this.addActivos(this.clientes,cs);
    })

    var menu = document.querySelector('ion-menu')
    menu.hidden = false;

    vService.listar().subscribe(vs=>{
      this.ventas = vs;
        for (let i=0; i<this.ventas.length; i++)
        {
          console.log("entre");
          dService.listar(this.ventas[i].id).subscribe(ds=>{
            console.log("esto es el ds:",ds);

            for(let j =0; j < ds.length; j++)
            {
              var producto = this.listaProductos[ds[j].titulo];
              if(producto){
                this.listaProductos[ds[j].titulo] += ds[j].cantidad;
              }else{
                this.listaProductos[ds[j].titulo] = 0;
                this.listaProductos[ds[j].titulo] += ds[j].cantidad;
              }
            }
            console.log('lista producto:',this.listaProductos);
          })
        }

      })

  }

  filtrarVentaMes(){
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
      console.log('detalle:',this.detalles[i]);
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
  ngAfterViewInit(){
    this.dibujarGrafico();
  }
  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + (r().toFixed(1) + 1) + ')';
    console.log(rgb)
    return rgb;
  }

  dibujarGrafico(){
    let arr = [];
    let background = ["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"];
    let bordes = ["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"];
    let valores = [32,78,5,12];
    let labels = ["a","b","c","d"];
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
              label: "Datos",
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
