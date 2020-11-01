import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
import { ClienteService } from '../../_servicios/cliente.service';

@Component({
  selector: 'app-ver-venta',
  templateUrl: './ver-venta.page.html',
  styleUrls: ['./ver-venta.page.scss'],
})
export class VerVentaPage implements OnInit {
  venta;
  ventaFecha = new Date();
  textoFecha = '';
  detalle = [];
  clientes = [];
  cliente;

  constructor(private navParams: NavParams, private clienteService: ClienteService, private modalCtrl:ModalController) {

  }

  ngOnInit() {
    var venta = this.navParams.get("venta");
    this.iniciarDatos(venta);
    this.venta = venta;
    this.detalle = venta.detalle;
    this.ventaFecha = new Date(venta.fecha);
    this.textoFecha = this.ventaFecha.toLocaleDateString();
  }

 iniciarDatos(venta){
   this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
        this.clientes = c;
        this.encontrarCliente(venta.idCliente);
      })
    })
    //este deberia ejecutarse cuando termina esta
  }

  encontrarCliente(idCliente){
    for(let i = 0 ; i < this.clientes.length;i++){
      var cli = this.clientes[i];
      if(cli.id == idCliente){
        this.cliente = cli;
        console.log('cliente-xd',this.cliente);
      }
    }
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  
}
