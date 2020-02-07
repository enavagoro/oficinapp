import { Component, Directive, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductoService } from '../_servicios/producto.service';
import { GastoService } from '../_servicios/gasto.service';
import { ClienteService } from '../_servicios/cliente.service';
import * as jsPDF from 'jspdf';
import { Chart } from "chart.js";

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
  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"];
  private chart1: Chart;
  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;

  constructor(public cService:ClienteService,public gService:GastoService,public pService : ProductoService) {
    pService.listar().subscribe(ps =>{
      this.addActivos(this.productos,ps)
    })
    gService.listar().subscribe(gs=>{
      this.addActivos(this.gastos,gs)
    })
    cService.listar().subscribe(cs=>{
      this.addActivos(this.clientes,cs);
    })
  }
  addActivos(original,arr){
    for(let i = 0 ; i < arr.length ; i++){
      if(arr[i].estado == 1){
        original.push(arr[i]);
      }
    }
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
