import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';
import { VentaService} from '../_servicios/venta.service';
import { DetallePage } from './detalle/detalle.page';
import { StockService } from '../_servicios/stock.service';
import { CrearClienteVentaPage } from './crear-cliente-venta/crear-cliente-venta.page'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})

export class VentasPage implements OnInit {
  nombreCliente = "";
  clientesFiltrado = [];
  private clientes  = [];
  cliente ;
  ventas  = [];
  ventasFiltradas = [];
  public venta  = {estado:0,id:0,idCliente:0,fecha:new Date(),detalle:[],tipoDocumento:0,idEmpresa:0,idUsuario:0};
  detalle = [];
  bandera = false;
  flag = false;
  banderaOpciones = false;

  constructor(public actionSheetController: ActionSheetController,
              private clienteService:ClienteService,
              private stock : StockService,
              private ventaService:VentaService,
              private detalleService:DetalleService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {
                  clienteService.listar().subscribe(c=>{
                        this.clientes = c;
                  })
              }

  ngOnInit() {
    this.ventaService.listar().subscribe(v=>{
        this.ventas = v;
      })
  }
  traerCliente(id){
    var clientes = this.clientes.filter( (cliente)=>cliente.id == id );
    console.log(clientes);
    if(clientes.length > 0 ){
      this.clientesFiltrado.push(clientes[0])
      this.cliente = clientes[0];
    }

  }
  encontrarCliente(idCliente){
    for(let i = 0 ; i < this.clientes.length;i++){
      let cli = this.clientes[i];
      if(cli.id == idCliente){
        return cli.nombre;
      }
    }
    return "cliente no existe";
  }

  public traerclientes(){
    this.ngOnInit();
  }
  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
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

    if(this.nombreCliente==""){
      this.filtrarCliente();
    }
  }


  verCliente(cliente){
    this.nombreCliente = cliente.nombre;
    this.cliente = cliente;
    this.filtrarCliente();
    //console.log(cliente);
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
  public ejecutarInsercion(indice,tam){
    if(indice == tam){
      this.ventaService.insertar(this.venta).subscribe(data=>{
        //console.log(data);
        this.ngOnInit();
        this.detalle = [];
        this.cliente = undefined;
        this.nombreCliente = "";
        this.venta = {estado:0,id:0,idCliente:0,fecha:new Date(),detalle:[],tipoDocumento:0,idEmpresa:0,idUsuario:0};
      })
    }
  }
  public guardarVenta(){
    //console.log('entra');
    this.venta.id = 0 + (this.ventas.length + 1);
    this.venta.idCliente = this.cliente.id;
    this.venta.detalle = this.detalle;

    var i = 0;
    var inventariados = this.venta.detalle.filter(prod=>{return prod.tipo == 1})
    for(var producto of this.venta.detalle){
      if(producto.tipo == 1){
        this.stock.descontar(producto.cantidad,producto['id']).subscribe(d=>{
          console.log(d);
          if(d['error']){
            alert(d['error']);
          }else{
            i++;
            this.ejecutarInsercion(i,inventariados.length);
          }

        })
      }
    }


  }

  public actualizarVenta(){
    this.ventaService.actualizar(this.venta,this.venta.id).subscribe(venta=>{
      //console.log(venta);
      this.ngOnInit();
      this.venta = {estado:0,id:0,idCliente:0,fecha:new Date(),detalle:[],tipoDocumento:0,idEmpresa:0,idUsuario:0};
      this.limpiar();
    })
  }
  public eliminacionLogica(){
    this.ventaService.eliminar(this.venta,this.venta.id).subscribe(datos=>{
      //console.log(datos);
      this.ngOnInit();
    })
  }
  public deshabilitarInputs(estado){
    var form = document.querySelector('form');
    for (let i=0; i<form.elements.length; i++)
    {
      (form.elements[i] as any).disabled=estado;
    }
  }

  public cancelar(){
    this.bandera=false;
    this.deshabilitarInputs(false);
    this.detalle = [];
    this.cliente = undefined;
    this.nombreCliente = "";
    this.venta = {estado:0,id:0,idCliente:0,fecha:new Date(),detalle:[],tipoDocumento:0,idEmpresa:0,idUsuario:0};
  }

  async eliminar(opcion) {
    //console.log(this.venta);
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UNA VENTA</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
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
    //console.log(this.venta);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UNA VENTA</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
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
    //console.log(this.venta);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UNA VENTA</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
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
    //console.log(venta)
    var opcion = "Borrar";
    if(venta.estado == 0){
      opcion = "Recuperar"
    }
    this.deshabilitarInputs(false);
    this.bandera=false;
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'eye',
        handler: () => {
          venta.tipo=''+venta.tipo;
          this.venta = venta;
          console.log(venta);
          this.banderaOpciones=true;
          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
          this.traerCliente(venta.idCliente);
          venta.detalles = venta.detalle;
          this.detalle = venta.detalle;
        }
      },{
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.venta = venta;
          this.traerCliente(venta.idCliente);
          this.detalleService.listar(venta.id).subscribe(detalle=>{
            venta.detalles = detalle;
            this.detalle = detalle;
          })
        }
      },{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          venta.id == 0;
          this.venta = venta;
          this.venta.id = 0;
          //console.log(this.venta);
        }
      },{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.venta = venta;
          this.eliminar(opcion);
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  borrar(index){
    //console.log(index);
    var nuevo = [];
    for(let i = 0 ; i< this.detalle.length;i++){
      if(i != index){
        nuevo.push(this.detalle[i]);
      }
    }
    //console.log(nuevo);
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

  limpiar(){
    this.cliente = undefined;
    this.nombreCliente = "";
  }

  async abrirCliente() {

    const modal = await this.modalCtrl.create({
      component: CrearClienteVentaPage,
      cssClass: 'modals',
/*
      componentProps:{
        'detalle' : this.detalle
      }
      */
    });

    modal.onDidDismiss().then(modal=>{
      console.log("haciendo pruebas");
      this.ngOnInit();
    });

    return await modal.present();

}

}
