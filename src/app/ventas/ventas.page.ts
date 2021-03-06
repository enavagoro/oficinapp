import { Component } from '@angular/core';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService } from '../_servicios/cliente.service';
import { PERMISSION,UsuarioService } from '../_servicios/usuario.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DetalleService } from '../_servicios/detalle.service';
import { VentaService} from '../_servicios/venta.service';
import { DetallePage } from './detalle/detalle.page';
import { StockService } from '../_servicios/stock.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CrearClienteVentaPage } from './crear-cliente-venta/crear-cliente-venta.page'


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})

export class VentasPage {

  nombreCliente = "";
  cantidadVisible : number = 10;
  clientesFiltrado = [];
  private clientes  = [];
  cliente ;
  ventas  = [];
  ventasFiltradas = [];
  clientExist = true;
  permission : PERMISSION = {c:false,r:false,u:false,d:false};
  public venta  = {estado:0,id:0,idCliente:0,desde:'Jazmin',fecha:new Date().toLocaleDateString(),detalle:[],dia:'0',metodo:'0',tipoDocumento:'0',idEmpresa:0,idUsuario:''};
  metodos = [
    {nombre:"Efectivo",valor:0},
    {nombre:"Debito",valor:1},
    {nombre:"Crédito",valor:2}];
  dias = [
    {nombre:'En el momento',valor:0},
    {nombre:'30 dias',valor:1},
    {nombre:'60 dias',valor:2}];
  detalle = [];
  totalVentas : number = 0;
  bandera = false;
  flag = false;
  banderaOpciones = false;
  usuario : any;
//historial
  banderaHistorial = true;
  fechaMenor;
  fechaMayor;
  ventasRespaldo = [];
  ventasActivas = [];
  respaldoBuscar = [];
  buscar = '';
  arregloFiltrado = [];

  constructor(public actionSheetController: ActionSheetController,
              private clienteService:ClienteService,
              private stock : StockService,
              private router : Router,
              public storage : Storage,
              private usuarioService : UsuarioService,
              private ventaService:VentaService,
              private detalleService:DetalleService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {

                this.storage.get('usuarios').then((val) => {
                  if(val){
                    this.cargaInicial();
                    this.usuario = val;
                    console.log(val);
                    var permission = this.usuarioService.tienePermiso(val,'ventas');
                    if(permission){
                      this.permission = permission;
                      if(!permission.r){
                        this.storage.clear();
                        this.router.navigate(['/login'], {replaceUrl: true});
                      }
                    }
                  }else{
                    this.router.navigate(['/login'], {replaceUrl: true});
                  }
                })

                console.log('venta-con:',this.venta);
              }

  cargaInicial() {
    this.ventaService.listar().then(servicio=>{
      servicio.subscribe(v=>{
          this.ventas = v.reverse();
          this.ventasRespaldo = this.ventas;
          this.calcularVentasActivas();
      })
    })
    this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
            this.clientes = c;
      })
    })
  }
  a(id){
    var clientes = this.clientes.filter( (cliente)=>cliente.id == id );
    console.log(clientes);
    if(clientes.length > 0 ){
      this.clientesFiltrado.push(clientes[0])
      this.cliente = clientes[0];
    }

  }
  encontrarCliente(venta){
    var idCliente = venta.idCliente;
    var total = 0;
    venta.detalle.map( detalle => { total +=  detalle.cantidad * detalle.precio });
    var texto = new Date(venta.fecha).toLocaleDateString() + " : $"+total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

    for(let i = 0 ; i < this.clientes.length;i++){
      let cli = this.clientes[i];
      if(cli.id == idCliente){
        return texto +" ("+cli.nombre+")";
      }
    }

    return "cliente no existe";
  }

  public traerclientes(){
    this.cargaInicial();
  }
  cambiarFecha(d){
    console.log(d);
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
  }

  async abrirDetalle() {

    const modal = await this.modalCtrl.create({
      component: DetallePage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle,
        'bandera' : this.bandera,
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
        this.cargaInicial();
        this.detalle = [];
        this.cliente = undefined;
        this.nombreCliente = "";
        this.venta = {estado:0,id:0,idCliente:0,desde:'Jazmin',fecha:new Date().toLocaleDateString(),detalle:[],dia:'0',metodo:'0',tipoDocumento:'0',idEmpresa:0,idUsuario:''};
      })
    }
  }
  public guardarVenta(){
    //this.venta.id = 0 + (this.ventas.length + 1);
    this.venta.idCliente = this.cliente.id;
    this.venta.detalle = this.detalle;
    this.venta.idUsuario = this.usuario['id'];
    console.log(this.venta) ;

    var i = 0;
    var inventariados = this.venta.detalle.filter(prod=>{return prod.tipo == 1})
    if(inventariados.length == 0){
      this.ejecutarInsercion(i,inventariados.length);
    }else{
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

  }

  public actualizarVenta(){
    this.ventaService.actualizar(this.venta,this.venta.id).subscribe(venta=>{
      this.cargaInicial();
      this.venta = {estado:0,id:0,idCliente:0,desde:'Jazmin',fecha:new Date().toLocaleDateString(),detalle:[],tipoDocumento:'0',dia:'0',metodo:'0',idEmpresa:0,idUsuario:''};
      this.limpiar();
    })
  }
  public eliminacionLogica(){
    this.ventaService.eliminar(this.venta,this.venta.id).subscribe(datos=>{
      this.cargaInicial();
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
    this.venta = {estado:0,id:0,idCliente:0,desde:'Jazmin',fecha:new Date().toLocaleDateString(),detalle:[],dia:'0',metodo:'0',tipoDocumento:'0',idEmpresa:0,idUsuario:''};
  }

  async eliminar(opcion) {
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
    this.detalle = [];
    var ver = {
      text: 'Ver',
      icon: 'eye',
      handler: () => {
        venta.tipo=''+venta.tipo;
        this.venta = venta;
        this.venta.dia = (this.venta.dia == "undefined" || !this.venta.dia ? '0' : this.venta.dia )  ;
        this.venta.metodo = (this.venta.metodo == "undefined" || !this.venta.metodo ? '0' : this.venta.metodo )  ;
        this.venta.tipoDocumento = (this.venta.tipoDocumento == "undefined" || !this.venta.tipoDocumento ? '0' : this.venta.tipoDocumento )  ;
        console.log(venta);
        this.banderaOpciones=true;
        this.deshabilitarInputs(true);
        this.bandera=true;
     //   this.traerCliente(venta.idCliente);
        venta.detalles = venta.detalle;
        this.detalle = venta.detalle;
      }
    };
    var actualizar = {
      text: 'Actualizar',
      icon: 'sync',
      handler: () => {
        this.bandera=false;
        this.venta = venta;
 //      this.traerCliente(venta.idCliente);
        venta.detalle = venta.detalle;
        this.detalle = venta.detalle;
 /*
        this.detalleService.listar(venta.id).subscribe(detalle=>{
            venta.detalles = detalle;
            this.detalle = detalle;
        })
        */
      }
    }
    var duplicar = {
      text: 'Duplicar',
      icon: 'albums',
      handler: () => {
        this.bandera=false;
        venta.id == 0;
        this.venta = venta;
        this.venta.id = 0;
      }
    };
    var borrar = {
      text: opcion,
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.bandera=false;
        this.venta = venta;
        this.eliminar(opcion);
      }
    };
    var cancelar = {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }
    var botones = [ver];
    if(this.permission.u){
      botones.push(actualizar)
    }
    if(this.permission.c){
      botones.push(duplicar)
    }
    if(this.permission.d){
      botones.push(borrar);
    }
    botones.push(cancelar)
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: botones
    });
    await actionSheet.present();
  }

  borrar(index){
    var nuevo = [];
    for(let i = 0 ; i< this.detalle.length;i++){
      if(i != index){
        nuevo.push(this.detalle[i]);
      }
    }
    this.detalle = nuevo;
  }

  aumentarCantidad(){
    this.cantidadVisible += 10;
  }

  disminuirCantidad(){
    this.cantidadVisible -= 10;
  }

  filtrarVentas(){
    this.totalVentas = 0;
    var ventas = [];
    for(let i = 0 ; i < this.ventas.length ; i ++){
      if(this.ventas[i].estado && i < this.cantidadVisible){
        this.ventas[i].detalle.map( detalle => { this.totalVentas +=  detalle.cantidad * detalle.precio });
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
    });

    modal.onDidDismiss().then(modal=>{
      console.log("haciendo pruebas");

      this.clienteService.listar().then(servicio=>{
        servicio.subscribe(c=>{
              this.clientes = c;
              this.cargaInicial();
        })
      })

    });

    return await modal.present();

  }

  escanearVenta(){
    console.log('venta',this.venta);
  }

  cambiarBandera(){
    console.log('entré');
    this.banderaHistorial = !this.banderaHistorial;
  }

  filtrarPorFecha(){
    this.ventas = this.ventasRespaldo;
    var arregloFiltrado = [];

      for(let venta of this.ventas){
        let fechaVenta = new Date(venta.fecha);
        if(this.fechaMayor && this.fechaMenor)
        {
          let fechaMenor = new Date(this.fechaMenor);
          let fechaMayor = new Date(this.fechaMayor);
          if(fechaVenta >= fechaMenor && fechaVenta <= fechaMayor){
            arregloFiltrado.push(venta);
          }
        }
        if(this.fechaMayor && !this.fechaMenor)
        {
          let fechaMayor = new Date(this.fechaMayor);
          if(fechaVenta <= fechaMayor){
            arregloFiltrado.push(venta);
          }
        }
        if(!this.fechaMayor && this.fechaMenor)
        {
          let fechaMenor = new Date(this.fechaMenor);
          if(fechaVenta >= fechaMenor){
            arregloFiltrado.push(venta);
          }
        }
    }
    console.log('arreglo filtrado',arregloFiltrado);
    this.arregloFiltrado = arregloFiltrado;
    this.ventas = arregloFiltrado;

    if(!this.fechaMayor && !this.fechaMenor){
      this.ventas = this.ventasRespaldo;
    }
  }

  limpiarFecha(tipo){
    console.log('entré',tipo);

    if(tipo=='mayor'){
      console.log('entré más adentro esta es la fecha a borrar',this.fechaMayor);
      this.fechaMayor = undefined;
      this.filtrarPorFecha();
    }
    if(tipo=='menor'){
      this.fechaMenor = undefined;
      this.filtrarPorFecha();
    }
  }

  filtrarLista(){
    this.ventas = [];

    console.log('este es el buscar',this.buscar);
    //esto es de la funcion de fecha
    if(this.arregloFiltrado.length > 0){
      for(let venta of this.arregloFiltrado){
        for(var indice in venta){
          if(typeof(venta[indice]) == "string" ){
            if(venta[indice].toUpperCase().includes(this.buscar.toUpperCase())){
              this.ventas.push(venta);
              break;
            }
          }
        }
      }
    }

    if(this.arregloFiltrado.length == 0){
      for(let venta of this.ventasRespaldo){
        for(var indice in venta){
          if(typeof(venta[indice]) == "string" ){
            if(venta[indice].toUpperCase().includes(this.buscar.toUpperCase())){
              this.ventas.push(venta);
              break;
            }
          }
        }
      }
    }

    if(this.buscar == ""){
      this.filtrarPorFecha();
    }
  }

  calcularVentasActivas(){
    for(var venta of this.ventasRespaldo){
      console.log('venta ventas activas:',venta);
      if(venta.estado){
        this.ventasActivas.push(venta);
      }
    }
  }

}
