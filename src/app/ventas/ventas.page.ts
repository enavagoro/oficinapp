import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente, Producto } from '../_servicios/cliente.service';
import { VentaService, Venta} from '../_servicios/venta.service';
import { DetallePage } from './detalle/detalle.page';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})

export class VentasPage implements OnInit {
  nombreCliente = "";
  clientesFiltrado = [];
  private clientes : Cliente[] = [];
  cliente : Cliente;
  ventas : Venta[] = [];
  public venta : Venta = {id:0,id_cliente:0,fecha:new Date(),detalles:[], documento: 0};
  detalle = [];

  constructor(private clienteService:ClienteService,
              private ventaService:VentaService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {
      clienteService.listar().subscribe(clientes=>{
        this.clientes = clientes;
        console.log(clientes);
      })
  }

  ngOnInit() {
    this.ventaService.listar().subscribe(ventas =>{
      console.log(ventas);
      this.ventas = ventas;
    })
  }
  encontrarCliente(id_cliente){
    for(let i = 0 ; i < this.clientes.length;i++){
      let cli = this.clientes[i];
      if(cli.id == id_cliente){
        return cli.nombre;
      }
    }
    return "cliente no existe";
  }

  public traerclientes(){
    this.clienteService.listar().subscribe(clientes => {
      console.log(clientes);
      this.clientes = clientes;
    })
  }

  filtrarCliente(){
    this.clientesFiltrado = [];

    for(let i=0; i<this.clientes.length; i++)
    {
      var nombre = this.clientes[i].nombre.toUpperCase();

      if(nombre.includes(this.nombreCliente.toUpperCase()) && this.clientes[i].estado != 0 ){
        this.clientesFiltrado.push(this.clientes[i]);
      }
    }
    if(this.clientesFiltrado.length == 0 ){
      this.cliente = undefined;
    }
  }

  verCliente(cliente){
    this.nombreCliente = cliente.nombre;
    this.cliente = cliente;
    this.filtrarCliente();
    console.log(cliente);
  }

  async abrirDetalle() {

    const modal = await this.modalCtrl.create({
      component: DetallePage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle
      }
    });

    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log("detalle conseguido",modal.data);
        this.detalle = modal.data;
      }
    });

    return await modal.present();
  }

  public guardarVenta(){
    console.log('entra');
    this.venta.id = 0 + (this.ventas.length + 1);
    this.venta.id_cliente = this.cliente.id;
    this.venta.detalles = this.detalle;
    this.ventaService.insertar(this.venta).subscribe(data=>{
      console.log(data);
    })
    this.ngOnInit();
    this.venta = {id:0,id_cliente:0,fecha:new Date(),detalles:[],documento: 0};
  }

  async confirmar() {
    console.log(this.venta);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN PRODUCTO</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.guardarVenta();
          }
        }
      ]
    });

    await alert.present();
  }
}
