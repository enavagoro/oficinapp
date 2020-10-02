import { Component, OnInit, Directive, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoService } from '../_servicios/producto.service';
import { GastoService } from '../_servicios/gasto.service';
import { VentaService } from '../_servicios/venta.service';
import { ClienteService } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';
import { CotizacionService } from '../_servicios/cotizacion.service';
import { Storage } from '@ionic/storage';
import { Chart } from "chart.js";
import { Router } from '@angular/router';
import { ReportePage } from './reporte/reporte.page';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  gastos = [];
  clientes = [];
  ventas = [];
  productos = [];
  cotizaciones = [];
  valorFinal=0;
  periodo = 0;

  gastoAnual = 0;
  gastoMensual = 0;
  gastoDiario = 0;

  ventaAnual = 0;
  ventaMensual = 0;
  tipo = 0;

  periodos = {'año':new Date().getFullYear(),'mes':new Date().getMonth(),'dia':new Date().getDay()};

  constructor(public router:Router,
              public storage:Storage,
              public cService:ClienteService,
              public gService:GastoService,
              public pService : ProductoService,
              public vService:VentaService,
              public dService:DetalleService,
              public ctService: CotizacionService,
              private modalCtrl : ModalController) {
  this.storage.get('usuarios').then((val) => {
    if(!val){
      this.router.navigate(['/login'], {replaceUrl: true});
    }
    /*
    AQUI PONER TUS FUNCIOONES
    */


      gService.listar().then(servicio=>{
        servicio.subscribe(g =>{
              this.gastos = g.filter(this.filtros);


        })
      })

      cService.listar().then(servicio=>{
        servicio.subscribe(cs=>{
              this.clientes = cs.filter(this.filtros);
        })
      })

      vService.listar().then(servicio=>{
        servicio.subscribe(vs=>{
              this.ventas = vs.filter(this.filtros);
        })
      })

      pService.listar().then(servicio=>{
        servicio.subscribe(ps=>{
              this.productos = ps.filter(this.filtros);
        })
      })

      ctService.listar().then(servicio=>{
        servicio.subscribe(ct=>{
              this.cotizaciones = ct.filter(this.filtros);
        })
      })

      })
    }

  ngOnInit() {
  }
  dropPlace(event,elemento){
    console.log(event);
    console.log(elemento);
  }
  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

  filtros(valor){
    if(valor.estado){
      return true;
    }
    return false;
  }

  async abrirReporte(tipo) {

    const modal = await this.modalCtrl.create({
        component: ReportePage,
        cssClass: 'modals',
        componentProps:{
          'tipoEntrante' : tipo
        }
      });

      modal.onDidDismiss().then(modal=>{
        this.ngOnInit();
      });

      return await modal.present();
  }

}
