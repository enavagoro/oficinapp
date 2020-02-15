import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ProductoService, Producto } from '../../_servicios/producto.service';
import { TipoProductoService, TipoProducto } from '../../_servicios/tipo-producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})

export class ProductoPage implements OnInit {
  productos = [];
  public producto : Producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
  tiposProductos = [];
  bandera = false;

  constructor(public actionSheetController: ActionSheetController,
              private tipoProductoService : TipoProductoService,
              private productoService : ProductoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.tipoProductoService.listar().subscribe(tipos=>{
      this.tiposProductos = tipos;
    })
    this.productoService.listar().subscribe(productos=>{
      this.productos = productos;
      console.log(productos);
    })
  }

  public guardarProducto(){
    console.log('entra');
    this.producto.id = 0 + (this.productos.length + 1);
    this.productoService.insertar(this.producto).subscribe(producto=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
  }

  public actualizarProducto(){
    this.productoService.actualizar(this.producto.id,this.producto).subscribe(producto=>{
      console.log(producto);
      this.ngOnInit();
      this.producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.productoService.borrar(this.producto.id,this.producto).subscribe(datos=>{
      console.log(datos);
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
    console.log(this.producto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN PRODUCTO</strong>!!!',
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
    console.log(this.producto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN PRODUCTO</strong>!!!',
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
            this.actualizarProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    console.log(this.producto);

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
            this.guardarProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(producto) {
    console.log('entró');
    console.log(producto);
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
          console.log(producto);
          console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
        }
      },{
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.producto = producto;
          console.log(producto);
        }
      },{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          producto.id == 0;
          this.producto = producto;
          this.producto.id = 0;
          console.log(this.producto);
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
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  filtrarProductos(){
    var productos = [];
    for(let i = 0 ; i < this.productos.length ; i ++){
      if(this.productos[i].estado){
        productos.push(this.productos[i]);
      }
    }
    return productos;
  }
}
