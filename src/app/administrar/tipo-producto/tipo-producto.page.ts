import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { TipoProductoService, TipoProducto } from '../../_servicios/tipo-producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.page.html',
  styleUrls: ['./tipo-producto.page.scss'],
})

export class TipoProductoPage implements OnInit {
  tipoProductos= [];
  public tipoProducto : TipoProducto = {id:0,titulo:'',codigo:''};

  constructor(private tipoProductoService : TipoProductoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.tipoProductoService.listar().subscribe(gastos=>{
      this.tipoProductos = gastos;
    })
  }

  public guardarTipoProducto(){
    console.log('entra');
    this.tipoProducto.id = 0 + (this.tipoProductos.length + 1);
    this.tipoProductoService.insertar(this.tipoProducto).subscribe(tipoProducto=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.tipoProducto = {id:0,titulo:'',codigo:''};
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
  }
