import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService, Cliente, Producto } from '../../_servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {

  clientes = [];
  public cliente : Cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
  public producto : Producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
  bandera = false;

  constructor(public actionSheetController: ActionSheetController,
              private clienteService : ClienteService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.clienteService.listar().then(clientes=>{
      clientes.subscribe(c=>{
        this.clientes= c;

      })
    })
  }

  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

  public guardarCliente(){
    //console.log('entra');
    this.cliente.id = 0 + (this.clientes.length + 1);
    this.clienteService.insertar(this.cliente).subscribe(cliente=>{
      //console.log('entra2');
      this.ngOnInit();
      this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
      this.cerrarModal();
    })
  }

  public actualizarCliente(){
    this.clienteService.actualizar(this.cliente.id,this.cliente).subscribe(cliente=>{
      //console.log(cliente);
      this.ngOnInit();
      this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
    })
  }

  async confirmar() {
    //console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN CLIENTE</strong>!!!',
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
            this.guardarCliente();
          }
        }
      ]
    });

    await alert.present();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
