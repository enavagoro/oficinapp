import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController,NavParams} from '@ionic/angular';
import { ProductoService, Producto } from '../_servicios/producto.service';
import { ClienteService, Cliente } from '../_servicios/cliente.service';
import { CotizacionService, Cotizacion } from '../_servicios/cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
})

export class CotizacionesPage implements OnInit {
  private producto = undefined;
  flag = true;
  private detalle = [];
  productos : Producto[] = [];
  clientes : Cliente[] = [];
  cotizaciones : Cotizacion[] = [];
  cotizacion : Cotizacion;

  constructor(private productoService: ProductoService,
              private clienteService: ClienteService,
              private cotizacionService: CotizacionService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.traerDatos();
  }

  traerDatos(){
    this.productoService.listar().subscribe(ps=>{
      this.productos = ps;
      console.log(ps);

    })

    this.clienteService.listar().subscribe(ps=>{
      this.clientes = ps;
    })
  }

  public guardarCotizacion(){
    console.log('entra');
    this.cotizacion.id = 0 + (this.cotizaciones.length + 1);
    /*this.cotizacion.id_cliente = this.cliente.id; */
    this.cotizacion.detalle = this.detalle;
    this.cotizacionService.insertar(this.cotizacion).subscribe(data=>{
      console.log(data);
    })
    this.ngOnInit();
    this.cotizacion = {estado:0,id:0,usuario:0,fecha:new Date(),detalle:[],idEmpresa:0,idUsuario:0};
  }

  async confirmar() {
    console.log(this.cotizacion);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UNA COTIZACION</strong>!!!',
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
            this.guardarCotizacion();
          }
        }
      ]
    });

    await alert.present();
  }
}

/**
  add(){
    let prod = this.productos[this.producto];
    let d = {id_producto : prod.id, titulo : prod.titulo,precio : prod.precio, cantidad : this.cantidad }
    this.detalle.push(d);
    this.cantidad = undefined;
    this.producto = undefined;
    console.log(this.detalle);
  }

  borrar(index){
    console.log(index);
    var nuevo = [];
    for(let i = 0 ; i< this.detalle.length;i++){
      if(i != index){
        nuevo.push(this.detalle[i]);
      }
    }
    console.log(nuevo);
    this.detalle = nuevo;
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


}
  */
