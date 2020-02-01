import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../_servicios/cliente.service';
import { ModalController } from '@ionic/angular';
import { DetallePage } from './detalle/detalle.page';


interface Cliente {
  id: number;
  nombre: string;
  rut: string;
  giro: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  contacto: string;
  tipoCompra: number;
  detalle : Array<Producto>
}

interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
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
  cliente : Cliente ;

  constructor(private clienteService:ClienteService,private modalCtrl:ModalController) {
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
  
/*

  guardar(){

    this.clienteService.insertar({ID:'HOLA'}).subscribe(clientes => {
    })
  }

  */
}
