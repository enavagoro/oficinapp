import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService, Cliente, Producto } from '../_servicios/cliente.service';
import { VentaService, Venta} from '../_servicios/venta.service';
import { DetallePage } from './detalle/detalle.page';

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
  public venta : Venta = {estado:0,id:0,id_cliente:0,fecha:new Date(),detalles:[], documento: 0,idEmpresa:0,idUsuario:0};
  detalle = [];

  constructor(public actionSheetController: ActionSheetController,
              private clienteService:ClienteService,
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
    this.venta = {estado:0,id:0,id_cliente:0,fecha:new Date(),detalles:[],documento: 0,idEmpresa:0,idUsuario:0};
  }

  public actualizarVenta(){
    this.ventaService.actualizar(this.venta.id,this.venta).subscribe(venta=>{
      console.log(venta);
      this.ngOnInit();
      this.venta = {estado:0,id:0,id_cliente:0,fecha:new Date(),detalles:[],documento: 0,idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.ventaService.borrar(this.venta.id,this.venta).subscribe(datos=>{
      console.log(datos);
      this.ngOnInit();
    })
  }
  async eliminar(opcion) {
    console.log(this.venta);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UNA VENTA</strong>!!!',
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
            this.eliminacionLogica();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmarActualizar() {
    console.log(this.venta);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UNA VENTA</strong>!!!',
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
            this.actualizarVenta();
          }
        }
      ]
    });

    await alert.present();
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
  async opciones(venta) {
    console.log(venta)
    var opcion = "BORRAR";
    if(venta.estado == 0){
      opcion = "RECUPERAR"
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.venta = venta;
          this.eliminar(opcion);
        }
      }, {
        text: 'Actualizar',
        icon: 'share',
        handler: () => {
          this.venta = venta;
          console.log(venta);
        }
      },{
        text: 'Duplicar',
        icon: 'heart',
        handler: () => {
          venta.id == 0;
          this.venta = venta;
          this.venta.id = 0;
          console.log(this.venta);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  borrar(index){
    console.log(index);
    var nuevo = [];
    for(let i = 0 ; i< this.detalle.length;i++){
      if(i != index){
        nuevo.push(this.detalle[i]);
      }
    }
    console.log(nuevo);
    this.detalle = nuevo;
  }

  filtrarVentas(){
    var ventas = [];
    for(let i = 0 ; i < this.ventas.length ; i ++){
      if(this.ventas[i].estado){
        ventas.push(this.ventas[i]);
      }
    }
    return ventas;
  }


}
