import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { TipoProductoService, TipoProducto } from '../../_servicios/tipo-producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.page.html',
  styleUrls: ['./tipo-producto.page.scss'],
})

export class TipoProductoPage implements OnInit {
  tipoProductos= [];
  public tipoProducto : TipoProducto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};

  constructor(public actionSheetController: ActionSheetController,
              private tipoProductoService : TipoProductoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.tipoProductoService.listar().then(gastos=>{
      gastos.subscribe(g=>{
        this.tipoProductos = g;
      })
    })
  }

  public guardarTipoProducto(){
    console.log('entra');
    this.tipoProducto.id = 0 + (this.tipoProductos.length + 1);
    this.tipoProductoService.insertar(this.tipoProducto).subscribe(tipoProducto=>{
      console.log('entra2');
      this.ngOnInit();
      this.tipoProducto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
    })

  }
  public actualizarTipoProducto(){
    this.tipoProductoService.actualizar(this.tipoProducto.id,this.tipoProducto).subscribe(tipoProducto=>{
      console.log(tipoProducto);
      this.ngOnInit();
      this.tipoProducto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.tipoProductoService.borrar(this.tipoProducto.id,this.tipoProducto).subscribe(datos=>{
      console.log(datos);
      this.ngOnInit();
    })
  }
  async eliminar(opcion) {
    console.log(this.tipoProducto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN TIPO DE PRODUCTO</strong>!!!',
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
    console.log(this.tipoProducto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN TIPO DE PRODUCTO</strong>!!!',
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
            this.actualizarTipoProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    console.log(this.tipoProducto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN TIPO DE PRODUCTO/SERVICIO</strong>!!!',
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
            this.guardarTipoProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(tipoProducto) {
    console.log(tipoProducto)
    var opcion = "BORRAR";
    if(tipoProducto.estado == 0){
      opcion = "RECUPERAR"
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.tipoProducto = tipoProducto;
          this.eliminar(opcion);
        }
      }, {
        text: 'Actualizar',
        icon: 'share',
        handler: () => {
          this.tipoProducto = tipoProducto;
          console.log(tipoProducto);
        }
      },{
        text: 'Duplicar',
        icon: 'heart',
        handler: () => {
          tipoProducto.id == 0;
          this.tipoProducto = tipoProducto;
          this.tipoProducto.id = 0;
          console.log(this.tipoProducto);
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
  filtrarTipoProductos(){
    var tipoProductos = [];
    for(let i = 0 ; i < this.tipoProductos.length ; i ++){
      if(this.tipoProductos[i].estado){
        tipoProductos.push(this.tipoProductos[i]);
      }
    }
    return tipoProductos;
  }
}
