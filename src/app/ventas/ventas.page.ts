import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../_servicios/cliente.service';
import { VentaService } from '../_servicios/venta.service';
import { DetallePage } from './detalle/detalle.page';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';

interface  Cliente {
  id: number;
  nombre: string;
  rut: string;
  giro: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  contacto: string;
  tipoCompra: number;
  detalle : Array<Producto>;
}

interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
}

interface Venta {
  id: number;
  id_cliente: number;
  fecha: Date;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})

export class VentasPage implements OnInit {

  nombreCliente = "";
  clientesFiltrado = [];
  private clientes : Cliente[] = [];
  cliente : Cliente;
  ventas = [];
  public venta : Venta = {id:0,id_cliente:0,fecha:new Date()};

  constructor(private clienteService:ClienteService,
              private ventaService:ClienteService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {
      clienteService.listar().subscribe(clientes=>{
        this.clientes = clientes;
        console.log(clientes);
      })
  }

  ngOnInit() {
  }

  public traerclientes(){
    this.clienteService.listar().subscribe(clientes => {
      console.log(clientes);
      this.clientes = clientes;
    })
  }

  filtrarCliente(){
    this.clientesFiltrado = [];

    for(let i=0; i<this.clientes.length; i++)
    {
      var nombre = this.clientes[i].nombre.toUpperCase();

      if(nombre.includes(this.nombreCliente.toUpperCase())){
        this.clientesFiltrado.push(this.clientes[i]);
      }
    }
    if(this.clientesFiltrado.length == 0 ){
      this.cliente = undefined;
    }
  }

  verCliente(cliente){
    this.nombreCliente = cliente.nombre;
    this.cliente = cliente;
    this.filtrarCliente();
    console.log(cliente);
  }

  async abrirDetalle() {

    const modal = await this.modalCtrl.create({
      component: DetallePage,
      cssClass: 'modals',
    });

    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log("preguntas conseguidas",modal.data);
        this.cliente.detalle = modal.data;
      }

    });

    return await modal.present();
  }

  public guardarVenta(){
    console.log('entra');
    this.venta.id = 0 + (this.ventas.length + 1);
    this.venta.id_cliente = this.cliente.id;
    this.ventaService.insertar(this.venta).subscribe(venta=>{
      console.log('entra2',this.venta);
    })
    console.log('entra3');
    this.ventas.push(this.venta);
    this.venta = {id:0,id_cliente:0,fecha:new Date()};
  }

  async confirmar() {
    console.log(this.venta);

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
            this.guardarVenta();
          }
        }
      ]
    });

    await alert.present();
  }
}
