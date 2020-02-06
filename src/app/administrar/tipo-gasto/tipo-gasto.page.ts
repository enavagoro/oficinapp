import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { TipoGastoService, TipoGasto } from '../../_servicios/tipo-gasto.service';

@Component({
  selector: 'app-tipo-gasto',
  templateUrl: './tipo-gasto.page.html',
  styleUrls: ['./tipo-gasto.page.scss'],
})

export class TipoGastoPage implements OnInit {
  tipoGastos= [];
  public tipoGasto : TipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};

  constructor(public actionSheetController: ActionSheetController,
              private tipoGastoService : TipoGastoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.tipoGastoService.listar().subscribe(gastos=>{
      this.tipoGastos = gastos;
    })
  }

  public guardarTipoGasto(){
    console.log('entra');
    this.tipoGasto.id = 0 + (this.tipoGastos.length + 1);
    this.tipoGastoService.insertar(this.tipoGasto).subscribe(tipoGasto=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
  }
  public actualizarTipoGasto(){
    this.tipoGastoService.actualizar(this.tipoGasto.id,this.tipoGasto).subscribe(tipoGasto=>{
      console.log(tipoGasto);
      this.ngOnInit();
      this.tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.tipoGastoService.borrar(this.tipoGasto.id,this.tipoGasto).subscribe(datos=>{
      console.log(datos);
      this.ngOnInit();
    })
  }
  async eliminar(opcion) {
    console.log(this.tipoGasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN TIPO DE GASTO</strong>!!!',
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
    console.log(this.tipoGasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN TIPO DE GASTO</strong>!!!',
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
            this.actualizarTipoGasto();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    console.log(this.tipoGasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN TIPO GASTO</strong>!!!',
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
            this.guardarTipoGasto();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(tipoGasto) {
    console.log(tipoGasto)
    var opcion = "BORRAR";
    if(tipoGasto.estado == 0){
      opcion = "RECUPERAR"
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.tipoGasto = tipoGasto;
          this.eliminar(opcion);
        }
      }, {
        text: 'Actualizar',
        icon: 'share',
        handler: () => {
          this.tipoGasto = tipoGasto;
          console.log(tipoGasto);
        }
      },{
        text: 'Duplicar',
        icon: 'heart',
        handler: () => {
          tipoGasto.id == 0;
          this.tipoGasto = tipoGasto;
          this.tipoGasto.id = 0;
          console.log(this.tipoGasto);
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
  filtrarTipoGastos(){
    var tipoGastos = [];
    for(let i = 0 ; i < this.tipoGastos.length ; i ++){
      if(this.tipoGastos[i].estado){
        tipoGastos.push(this.tipoGastos[i]);
      }
    }
    return tipoGastos;
  }
}
