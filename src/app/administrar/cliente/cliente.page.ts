import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { ClienteService, Cliente, Producto } from '../../_servicios/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {

  clientes = [];
  public cliente : Cliente = {id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : []};
  public producto : Producto = {id:0,titulo:'',precio:0,codigo:''};

  constructor(private clienteService : ClienteService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {}

  ngOnInit() {
    this.clienteService.listar().subscribe(clientes=>{
      this.clientes= clientes;
    })
  }

  public guardarCliente(){
    console.log('entra');
    this.cliente.id = 0 + (this.clientes.length + 1);
    this.clienteService.insertar(this.cliente).subscribe(cliente=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.cliente = {id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : []};
  }

  async confirmar() {
    console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN CLIENTE</strong>!!!',
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
            this.guardarCliente();
          }
        }
      ]
    });

    await alert.present();
  }
}
