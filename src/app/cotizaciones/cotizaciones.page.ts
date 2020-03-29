import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService, Cliente, Producto } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';
import { CotizacionService, Cotizacion } from '../_servicios/cotizacion.service';
import { DetalleCotizacionPage } from './detalle-cotizacion/detalle-cotizacion.page';
import { CrearClientePage } from './crear-cliente/crear-cliente.page';
//import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
})

export class CotizacionesPage implements OnInit {
  flag = false;
  bandera = false;
  detalle = [];
  productos : Producto[] = [];
  clientes : Cliente[] = [];
  cliente : Cliente;
  nombreCliente = "";
  clientesFiltrado = [];

  cotizaciones = [];
  public cotizacion : Cotizacion = {id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0};

  constructor(public actionSheetController: ActionSheetController,
              private clienteService: ClienteService,
              private cotizacionService: CotizacionService,
              private detalleService:DetalleService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {
              }

  ngOnInit() {
    console.log("entre");

    this.cotizacionService.listar().then(cotizaciones =>{
      cotizaciones.subscribe(cotizaciones=>{
        this.cotizaciones = cotizaciones;
      })
    })

    this.clienteService.listar().then(clientes=>{
      clientes.subscribe(c=>{
          this.clientes = c;
      })
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

  encontrarCliente(id_cliente){
    for(let i = 0 ; i < this.clientes.length;i++){
      let cli = this.clientes[i];
      if(cli.id == id_cliente){
        return cli.nombre;
      }
    }
    return "cliente no existe";
  }

  public traerClientes(){
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
      this.limpiar();
    }
  }


  verCliente(cliente){
    this.nombreCliente = cliente.nombre;
    this.cliente = cliente;
    this.filtrarCliente();
    //console.log(cliente);
  }
  async abrirCliente() {

    const modal = await this.modalCtrl.create({
      component: CrearClientePage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle
      }
    });

    modal.onDidDismiss().then(modal=>{
      console.log("haciendo pruebas");
      this.ngOnInit();
    });

    return await modal.present();

}

  async abrirDetalle() {

    const modal = await this.modalCtrl.create({
      component: DetalleCotizacionPage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle
      }
    });

    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        //console.log("detalle conseguido",modal.data);
        this.detalle = modal.data;
      }
    });

    return await modal.present();
  }

  /* Cotizaciones */

  public guardarCotizacion(){
    //console.log('entra');
    this.cotizacion.id = 0 + (this.cotizaciones.length + 1);
    this.cotizacion.idCliente = this.cliente.id;
    this.cotizacion.detalle = this.detalle;
    this.cotizacionService.insertar(this.cotizacion).subscribe(data=>{
      //console.log(data);
      this.ngOnInit();
      this.detalle = [];
      this.cliente = undefined;
      this.nombreCliente = "";
      this.cotizacion = {id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0};
    })
  }

  public actualizarCotizacion(){
    this.cotizacionService.actualizar(this.cotizacion.id,this.cotizacion).subscribe(cotizacion=>{
      //console.log(cotizacion);
      this.ngOnInit();
      this.cotizacion = {id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.cotizacionService.borrar(this.cotizacion.id,this.cotizacion).subscribe(datos=>{
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
    this.cotizacion = {id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0};
  }

  async eliminar(opcion) {
    //console.log(this.cotizacion);
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UNA COTIZACION</strong>!!!',
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
    //console.log(this.cotizacion);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UNA COTIZACION</strong>!!!',
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
            this.actualizarCotizacion();
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmar() {
    //console.log(this.cotizacion);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN PRODUCTO</strong>!!!',
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
            this.guardarCotizacion();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(cotizacion) {
    //console.log(cotizacion)
    var opcion = "Borrar";
    if(cotizacion.estado == 0){
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
          cotizacion.tipo=''+cotizacion.tipo;
          this.cotizacion = cotizacion;
          console.log(cotizacion);

          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
          this.traerCliente(cotizacion.id_cliente);
          /*this.detalleService.listar(cotizacion.id).subscribe(detalle=>{
            console.log(detalle);

            cotizacion.detalles = detalle;
            this.detalle = detalle;
          })*/
        }
      },{
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.cotizacion = cotizacion;
          this.traerCliente(cotizacion.id_cliente);
          /*
          this.detalleService.listar(cotizacion.id).subscribe(detalle=>{
            cotizacion.detalles = detalle;
            this.detalle = detalle;
          })
          */
        }
      },{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          cotizacion.id == 0;
          this.cotizacion = cotizacion;
          this.cotizacion.id = 0;
          //console.log(this.cotizacion);
        }
      },{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.cotizacion = cotizacion;
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

  filtrarCotizaciones(){
    var cotizaciones = [];
    for(let i = 0 ; i < this.cotizaciones.length ; i ++){
      if(this.cotizaciones[i].estado){
        cotizaciones.push(this.cotizaciones[i]);
      }
    }
    return cotizaciones;
  }

  limpiar(){
    this.cliente = undefined;
    this.nombreCliente = "";
  }
}
