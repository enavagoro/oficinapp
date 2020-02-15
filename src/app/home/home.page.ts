import { Component, Directive, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductoService } from '../_servicios/producto.service';
import { GastoService } from '../_servicios/gasto.service';
import { VentaService } from '../_servicios/venta.service';
import { ClienteService } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';
import { TipoGastoService } from '../_servicios/tipo-gasto.service';
import { Storage } from '@ionic/storage';
import * as jsPDF from 'jspdf';
import { Chart } from "chart.js";
import { Router } from '@angular/router';


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
  ventasMensuales = 0;
  ventasTotales = 0;
  gastosMensuales = 0;
  gastosAnuales = 0;
  detalles = [];
  listaProductos = [];
  listaGastos = [];
  labels = [];
  valores = [];
  tiposGastos = [];
  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"];
  private chart1: Chart;

  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;


  constructor(public router:Router,public storage:Storage,public tService :TipoGastoService,public cService:ClienteService,public gService:GastoService,public pService : ProductoService, public vService:VentaService, public dService:DetalleService) {
    console.log("constructor");
    pService.listar().then(ps =>{
      ps.subscribe(p=>{
        this.productos = p.filter(this.filtros);
      })
    })
    tService.listar().then(tipos=>{
      tipos.subscribe(t=>{
        this.tiposGastos = t;
        gService.listar().then(gs=>{
          gs.subscribe(g=>{
              this.gastos = g.filter(this.filtros);
              console.log(this.gastos);
              for(let gasto of this.gastos){

                var fechaTemporal = new Date(gasto.fecha);
                let fecha = new Date();
                if(fechaTemporal.getMonth()==fecha.getMonth() && fechaTemporal.getFullYear()==fecha.getFullYear()){
                  this.gastosMensuales += gasto.monto;
                }
                this.gastosAnuales += gasto.monto;
                var lista = this.listaGastos[this.tiposGastos[gasto.tipo].titulo];
                if(lista){
                  this.listaGastos[this.tiposGastos[gasto.tipo].titulo] += 1;
                }else{
                  this.listaGastos[this.tiposGastos[gasto.tipo].titulo] = 0;
                  this.listaGastos[this.tiposGastos[gasto.tipo].titulo] += 1;
                }
              }
              console.log(this.listaGastos)
          })

        })
      })
    })
    cService.listar().then(cs=>{
      cs.subscribe(c=>{
          this.clientes = c.filter(this.filtros);
      })

    })

    var menu = document.querySelector('ion-menu')
    menu.hidden = false;
    var contador = 0;
    vService.listar().then(vs=>{
      vs.subscribe(v=>{
        this.ventas = v.filter(this.filtros);
        for (let i=0; i<this.ventas.length; i++)
        {

          console.log("entre");
          dService.listar(this.ventas[i].id).subscribe(ds=>{
            console.log("esto es el ds:",ds);
            var fechaTemporal = new Date(this.ventas[contador].fecha);
            let fecha= new Date();
            contador ++;
            for(let j =0; j < ds.length; j++)
            {
              var producto = this.listaProductos[ds[j].titulo];
              if(producto){
                this.listaProductos[ds[j].titulo] += ds[j].cantidad;
              }else{
                this.listaProductos[ds[j].titulo] = 0;
                this.listaProductos[ds[j].titulo] += ds[j].cantidad;
              }
              if(fechaTemporal.getMonth()==fecha.getMonth() && fechaTemporal.getFullYear()==fecha.getFullYear()){
                this.ventasMensuales += ds[j].cantidad * ds[j].precio;
              }
              if(fechaTemporal.getFullYear()==fecha.getFullYear()){
                this.ventasTotales += ds[j].cantidad * ds[j].precio;
              }

            }
            console.log('lista producto:',this.listaProductos);
            if(contador == this.ventas.length){
                this.dibujarGrafico();
            }
          })
        }
      })


      })

  }
  filtros(gasto){
    if(gasto.estado == 1){
      return true;
    }
    return false;
  }
  productoMasVendido(){

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
  }
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

  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + (r().toFixed(1) + 1) + ')';
    console.log(rgb)
    return rgb;
  }

  dibujarGrafico(){
    console.log("dibujao");
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
