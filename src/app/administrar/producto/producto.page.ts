import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ProductoService } from '../../_servicios/producto.service';
import { TipoProductoService } from '../../_servicios/tipo-producto.service';
import { CrearTipoproductoPage } from './crear-tipoproducto/crear-tipoproducto.page';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})

export class ProductoPage implements OnInit {
  productos = [];
  public producto  = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
  tiposProductos = [];
  bandera = false;
  banderaMantenedor = true;
  banderaMensaje = true;

  banderaHistorial = true;
  fechaMenor;
  fechaMayor;
  productosRespaldo = [];
  respaldoBuscar = [];
  buscar = '';
  arregloFiltrado = [];
  cantidadVisible : number = 10;

  constructor(public actionSheetController: ActionSheetController,
              private tipoProductoService : TipoProductoService,
              private productoService : ProductoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    console.log(this.banderaMantenedor);

    var self = this;
    this.tipoProductoService.listar().then(servicio=>{
      servicio.subscribe(results=>{
            self.tiposProductos = results;
            //console.log(results)
      })
    })
    this.tipoProductoService.listar().then(servicio=>{
      servicio.subscribe(t=>{
          this.tiposProductos = t;
      })
    })
    this.productoService.listar().then(servicio=>{
      servicio.subscribe(p=>{
          this.productos = p;
          this.productosRespaldo = p;
          console.log(this.productos);
      })
    })
  }
  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }
  public guardarProducto(){
    //console.log('entra');
    this.producto.id = 0 + (this.productos.length + 1);
    this.productoService.insertar(this.producto).subscribe(producto=>{
      //console.log('entra2');
      this.ngOnInit();
      this.producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
    })
  }

  public actualizarProducto(){
    this.productoService.actualizar(this.producto,this.producto.id).subscribe(producto=>{
      //console.log(producto);
      this.ngOnInit();
      this.producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.productoService.eliminar(this.producto,this.producto.id).subscribe(datos=>{
      //console.log(datos);
      this.ngOnInit();
    })
  }

  public cancelar(){
    this.bandera=false;
    this.deshabilitarInputs(false);
    this.producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
  }

  public deshabilitarInputs(estado){
    var form = document.querySelector('form');
    for (let i=0; i<form.elements.length; i++)
    {
      (form.elements[i] as any).disabled=estado;
    }
  }

  async eliminar(opcion) {
    //console.log(this.producto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN PRODUCTO</strong>!!!',
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
    //console.log(this.producto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN PRODUCTO</strong>!!!',
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
            this.actualizarProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    //console.log(this.producto);

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
            this.guardarProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(producto) {
    //console.log('entró');
    //console.log(producto);
    var opcion = "Borrar";
    if(producto.estado == 0){
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
          producto.tipo=''+producto.tipo;
          this.producto = producto;
          //console.log(producto);
          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
        }
      },{
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.producto = producto;
          //console.log(producto);
        }
      },{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          producto.id == 0;
          this.producto = producto;
          this.producto.id = 0;
          //console.log(this.producto);
        }
      }, {
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.producto = producto;
          this.eliminar(opcion);
        }
      }, {
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

  filtrarProductos(){
    var productos = [];
    for(let i = 0 ; i < this.productos.length ; i ++){
      if(this.productos[i].estado && i < this.cantidadVisible){
        productos.push(this.productos[i]);
      }
    }
    return productos;
  }

  async abrirTipoProducto() {

    const modal = await this.modalCtrl.create({
      component: CrearTipoproductoPage,
      cssClass: 'modals',
      /*
      componentProps:{
        'detalle' : this.detalle
      }*/
    });

      modal.onDidDismiss().then(modal=>{
        console.log("haciendo pruebas");
        this.ngOnInit();
      });

      return await modal.present();

  }

  cambiarBandera(){
    console.log('entré');
    this.banderaHistorial = !this.banderaHistorial;
  }

  filtrarPorFecha(){
    this.productos = this.productosRespaldo;
    var arregloFiltrado = [];

      for(let producto of this.productos){
        let fechaProducto = new Date(producto.createdAt);
        if(this.fechaMayor && this.fechaMenor)
        {
          let fechaMenor = new Date(this.fechaMenor);
          let fechaMayor = new Date(this.fechaMayor);
          if(fechaProducto >= fechaMenor && fechaProducto <= fechaMayor){
            arregloFiltrado.push(producto);
          }
        }
        if(this.fechaMayor && !this.fechaMenor)
        {
          let fechaMayor = new Date(this.fechaMayor);
          if(fechaProducto <= fechaMayor){
            arregloFiltrado.push(producto);
          }
        }
        if(!this.fechaMayor && this.fechaMenor)
        {
          let fechaMenor = new Date(this.fechaMenor);
          if(fechaProducto >= fechaMenor){
            arregloFiltrado.push(producto);
          }
        }
    }
    console.log('arreglo filtrado',arregloFiltrado);
    this.arregloFiltrado = arregloFiltrado;
    this.productos = arregloFiltrado;

    if(!this.fechaMayor && !this.fechaMenor){
      this.productos = this.productosRespaldo;
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
    this.productos = [];

    console.log('este es el buscar',this.buscar);
//esto es de la funcion de fecha
    if(this.arregloFiltrado.length > 0){
      for(let producto of this.arregloFiltrado){

        for(var indice in producto){

          if(typeof(producto[indice]) == "string" ){
            if(producto[indice].toUpperCase().includes(this.buscar.toUpperCase())){
              this.productos.push(producto);
              break;
            }
          }
        }
      }
    }

    if(this.arregloFiltrado.length == 0){
      for(let producto of this.productosRespaldo){

        for(var indice in producto){

          if(typeof(producto[indice]) == "string" ){
            if(producto[indice].toUpperCase().includes(this.buscar.toUpperCase())){
              this.productos.push(producto);
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

  asignarFechaString(producto){
    var texto = new Date(producto.createdAt).toLocaleDateString();
    return "Creado el: "+ texto +" ("+producto.titulo+")";
  }

  aumentarCantidad(){
    this.cantidadVisible += 10;
  }

  disminuirCantidad(){
    this.cantidadVisible -= 10;
  }
}
