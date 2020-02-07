import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService, Cliente, Producto } from '../../_servicios/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {

  clientes = [];
  public cliente : Cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
  public producto : Producto = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};

  constructor(public actionSheetController: ActionSheetController,
              private clienteService : ClienteService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {}

  ngOnInit() {
    this.clienteService.listar().subscribe(clientes=>{
      this.clientes= clientes;
      this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
    })
  }

  public guardarCliente(){
    console.log('entra');
    this.cliente.id = 0 + (this.clientes.length + 1);
    this.clienteService.insertar(this.cliente).subscribe(cliente=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
  }
  
  public actualizarCliente(){
    this.clienteService.actualizar(this.cliente.id,this.cliente).subscribe(cliente=>{
      console.log(cliente);
      this.ngOnInit();
      this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.clienteService.borrar(this.cliente.id,this.cliente).subscribe(datos=>{
      console.log(datos);
      this.ngOnInit();
    })
  }
  async eliminar(opcion) {
    console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN CLIENTE</strong>!!!',
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
    console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN CLIENTE</strong>!!!',
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
            this.actualizarCliente();
          }
        }
      ]
    });

    await alert.present();
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
  async opciones(cliente) {
    console.log(cliente)
    var opcion = "BORRAR";
    if(cliente.estado == 0){
      opcion = "RECUPERAR"
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.cliente = cliente;
          this.eliminar(opcion);
        }
      }, {
        text: 'Actualizar',
        icon: 'share',
        handler: () => {
          this.cliente = cliente;
          console.log(cliente);
        }
      },{
        text: 'Duplicar',
        icon: 'heart',
        handler: () => {
          cliente.id == 0;
          this.cliente = cliente;
          this.cliente.id = 0;
          console.log(this.cliente);
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
  filtrarClientes(){
    var clientes = [];
    for(let i = 0 ; i < this.clientes.length ; i ++){
      if(this.clientes[i].estado){
        clientes.push(this.clientes[i]);
      }
    }
    return clientes;
  }
}
