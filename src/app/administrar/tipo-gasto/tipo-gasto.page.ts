import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { TipoGastoService, TipoGasto } from '../../_servicios/tipo-gasto.service';

@Component({
  selector: 'app-tipo-gasto',
  templateUrl: './tipo-gasto.page.html',
  styleUrls: ['./tipo-gasto.page.scss'],
})

export class TipoGastoPage implements OnInit {
  tipoGastos= [];
  public tipoGasto : TipoGasto = {id:0,titulo:'',codigo:''};

  constructor(private tipoGastoService : TipoGastoService,
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
    this.tipoGasto = {id:0,titulo:'',codigo:''};
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
}
