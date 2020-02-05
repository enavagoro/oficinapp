import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { GastoService, Gasto } from '../_servicios/gasto.service';
import { TipoGastoService, TipoGasto } from '../_servicios/tipo-gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})

export class GastosPage implements OnInit {

  gastos = [];
  public gasto : Gasto = {id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0};
  tiposGastos = [];

  constructor(
      private tipoGastoService : TipoGastoService,
      private gastoService:GastoService,
      private toastController : ToastController,
      private alertController :AlertController,
      private modalCtrl : ModalController) { }

  ngOnInit() {
    this.tipoGastoService.listar().subscribe(tipos=>{
      this.tiposGastos = tipos;
    })
    this.gastoService.listar().subscribe(gastos =>{
      this.gastos = gastos;
    })
  }

  public guardarGasto(){
    console.log('entra');
    this.gasto.id = 0 + (this.gastos.length + 1);
    this.gastoService.insertar(this.gasto).subscribe(gasto=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.gasto = {id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0};
  }

  async confirmar() {
    console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>Agregar un Gasto</strong>!!!',
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
            this.guardarGasto();
          }
        }
      ]
    });

    await alert.present();
  }
}
