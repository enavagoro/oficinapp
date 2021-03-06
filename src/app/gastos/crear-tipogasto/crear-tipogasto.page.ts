import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { TipoGastoService } from '../../_servicios/tipo-gasto.service';

@Component({
  selector: 'app-crear-tipogasto',
  templateUrl: './crear-tipogasto.page.html',
  styleUrls: ['./crear-tipogasto.page.scss'],
})

export class CrearTipogastoPage implements OnInit {
  tipoGastos= [];
  public tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
  bandera = false;

  constructor(public actionSheetController: ActionSheetController,
              private tipoGastoService : TipoGastoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    var self = this;
    this.tipoGastoService.listar().then(servicio=>{
      servicio.subscribe(results=>{
        self.tipoGastos = results;
       })
    })
  }

  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }
  public guardarTipoGasto(){
    //console.log('entra');
    this.tipoGasto.id = 0 + (this.tipoGastos.length + 1);
    this.tipoGastoService.insertar(this.tipoGasto).subscribe(tipoGasto=>{
      //console.log('entra2');
      this.ngOnInit();
      this.tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
    })

  }
  public actualizarTipoGasto(){
    this.tipoGastoService.actualizar(this.tipoGasto,this.tipoGasto.id).subscribe(tipoGasto=>{
      //console.log(tipoGasto);
      this.ngOnInit();
      this.tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.tipoGastoService.eliminar(this.tipoGasto,this.tipoGasto.id).subscribe(datos=>{
      this.tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
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
    this.tipoGasto = {estado:0,id:0,titulo:'',codigo:'',idEmpresa:0,idUsuario:0};
  }

  async eliminar(opcion) {
    //console.log(this.tipoGasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN TIPO DE GASTO</strong>!!!',
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
    //console.log(this.tipoGasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN TIPO DE GASTO</strong>!!!',
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
            this.actualizarTipoGasto();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    //console.log(this.tipoGasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN TIPO GASTO</strong>!!!',
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
            this.guardarTipoGasto();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(tipoGasto) {
    //console.log(tipoGasto)
    var opcion = "Borrar";
    if(tipoGasto.estado == 0){
      opcion = "Recuperar"
    }
    this.deshabilitarInputs(false);
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'eye',
        handler: () => {
          tipoGasto.tipo=''+tipoGasto.tipo;
          this.tipoGasto = tipoGasto;
          //console.log(tipoGasto);
          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
        }
      },{
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.tipoGasto = tipoGasto;
          //console.log(tipoGasto);
        }
      },{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          tipoGasto.id == 0;
          this.tipoGasto = tipoGasto;
          this.tipoGasto.id = 0;
          //console.log(this.tipoGasto);
        }
      }, {
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.tipoGasto = tipoGasto;
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
  filtrarTipoGastos(){
    var tipoGastos = [];
    for(let i = 0 ; i < this.tipoGastos.length ; i ++){
      if(this.tipoGastos[i].estado){
        tipoGastos.push(this.tipoGastos[i]);
      }
    }
    return tipoGastos;
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
