import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService } from '../_servicios/cliente.service';
import { DetalleService } from '../_servicios/detalle.service';
import { CotizacionService } from '../_servicios/cotizacion.service';
import { DetalleCotizacionPage } from './detalle-cotizacion/detalle-cotizacion.page';
import { DocumentoPage } from './documento/documento.page';
import { CrearClientePage } from './crear-cliente/crear-cliente.page';
import { EmpresaService } from '../_servicios/empresa.service';
import { LoginService } from '../_servicios/login.service';
import { Storage } from '@ionic/storage';
//import { ModalPage } from '../modal/modal.page';
const URL = "https://api.vase.cl";

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
})

export class CotizacionesPage implements OnInit {
  flag = false;
  img: string;
  bandera = false;
  detalle = [];
  empresa ;
  productos = [];
  clientes = [];
  cliente ;
  nombreCliente = "";
  clientesFiltrado = [];
  cotizaciones = [];
  public cotizacion = {nota:'',id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0,url:'', idUsuario:0};
  public datosPdf = {id:0, nota:'', fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado: 0, idUsuario: 0,
                                idCliente: 0,  nombreCliente: '', rutCliente: '', giroCliente: '', direccionCliente: '', comunaCliente: '', ciudadCliente: '', contactoCliente: '', idEmpresa: 0,url:''};
                                //, nombreEmpresa: '',rutEmpreasa: '', giroEmpresa : '', direccionEmpresa: '', comunaEmpresa: '', ciudadEmpresa: '', contactoEmpresa: ''
  constructor(public actionSheetController: ActionSheetController,
              private login : LoginService,
              private clienteService: ClienteService,
              private empresaService : EmpresaService,
              private storage : Storage,
              private cotizacionService: CotizacionService,
              private detalleService:DetalleService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {
              }

  ngOnInit() {
    console.log("entre");
    this.empresaService.getempresa(this.login.getEmpresa()).then(servicio=>{
      servicio.subscribe(e=>{
          this.empresa= e;
          console.log(this.empresa);
          this.img = URL+"/"+this.empresa['id']+"/"+this.empresa['url'];
          console.log(this.empresa['url']);
          console.log(this.img);
      })
    })
    this.cotizacionService.listar().then(servicio=>{
      servicio.subscribe(cotizaciones=>{
          this.cotizaciones = cotizaciones;
          console.log(cotizaciones);
      })
    })

    this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
            this.clientes = c;
      })
    })
  }

  traerCliente(id){
    var clientes = this.clientes.filter( (cliente)=>cliente.id == id );
    console.log(clientes);
    if(clientes.length > 0 ){
      this.clientesFiltrado.push(clientes[0])
      this.cliente = clientes[0];
    }
  }

  encontrarCliente(id_cliente){
    for(let i = 0 ; i < this.clientes.length;i++){
      let cli = this.clientes[i];
      if(cli.id == id_cliente){
        return cli.nombre;
      }
    }
    return "cliente no existe";
  }

  public traerClientes(){
    this.ngOnInit();
  }

  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

  filtrarCliente(){
    this.clientesFiltrado = [];

    for(let i=0; i<this.clientes.length; i++)
    {
      var nombre = this.clientes[i].nombre.toUpperCase();

      if(nombre.includes(this.nombreCliente.toUpperCase()) && this.clientes[i].estado != 0 ){
        this.clientesFiltrado.push(this.clientes[i]);
      }
    }
    if(this.clientesFiltrado.length == 0 ){
      this.cliente = undefined;
    }

    if(this.nombreCliente==""){
      this.limpiar();
    }
  }


  verCliente(cliente){
    this.nombreCliente = cliente.nombre;
    this.cliente = cliente;
    this.filtrarCliente();
    //console.log(cliente);
  }
  async abrirCliente() {

    const modal = await this.modalCtrl.create({
      component: CrearClientePage,
      cssClass: 'modals',
      /*
      componentProps:{
        'detalle' : this.detalle
      }
      */
    });

    modal.onDidDismiss().then(modal=>{
      console.log("haciendo pruebas");
      this.ngOnInit();
    });

    return await modal.present();

}

  async abrirDetalle() {

    const modal = await this.modalCtrl.create({
      component: DetalleCotizacionPage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle
      }
    });

    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        //console.log("detalle conseguido",modal.data);
        this.detalle = modal.data;
      }
    });

    return await modal.present();
  }

  /* Cotizaciones */

  public guardarCotizacion(){
    //console.log('entra');
    this.cotizacion.id = 0 + (this.cotizaciones.length + 1);
    this.cotizacion.idCliente = this.cliente.id;
    this.cotizacion.detalle = this.detalle;
    this.cotizacionService.insertar(this.cotizacion).subscribe(data=>{
      //console.log(data);
      this.ngOnInit();
      this.detalle = [];
      this.cliente = undefined;
      this.nombreCliente = "";
      this.cotizacion = {nota:'',id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0, url :''};
    })
  }

  public enviarPdf(){
    this.datosPdf.id = 0 + (this.cotizaciones.length + 1);
    this.datosPdf.detalle = this.detalle;
    this.datosPdf.estado = 1;
    this.datosPdf.fechaEmision = this.cotizacion.fechaEmision;
    this.datosPdf.fechaCaducidad = this.cotizacion.fechaCaducidad;

    this.datosPdf.idCliente = this.cliente.id;
    this.datosPdf.nombreCliente = this.cliente.nombre;
    this.datosPdf.rutCliente = this.cliente.rut;
    this.datosPdf.giroCliente = this.cliente.giro;
    this.datosPdf.direccionCliente = this.cliente.direccion;
    this.datosPdf.comunaCliente = this.cliente.comuna;
    this.datosPdf.ciudadCliente = this.cliente.ciudad;
    this.datosPdf.contactoCliente = this.cliente.contacto;
    this.datosPdf.nota = this.cotizacion.nota;

    this.datosPdf['idEmpresa'] = this.empresa['id'];
    this.datosPdf['url'] = this.empresa['url'];
    this.datosPdf['nombreEmpresa'] = this.empresa['nombre'];
    this.datosPdf['rutEmpresa'] = this.empresa['rut'];
    this.datosPdf['giroEmpresa'] = this.empresa['giro'];
    this.datosPdf['direccionEmpresa'] = this.empresa['direccion'];
    this.datosPdf['comunaEmpresa'] = this.empresa['comuna'];
    this.datosPdf['ciudadEmpresa'] = this.empresa['ciudad'];
    this.datosPdf['contactoEmpresa'] = this.empresa['contacto'];

    this.cotizacionService.insertarPdf(this.datosPdf).subscribe(data=>{
      //console.log(data);
      console.log("abrir documento");
      this.datosPdf['docto'] = data['docto'];
      this.abrirDocumento(data['docto'],this.datosPdf);
      this.ngOnInit();
      this.detalle = [];
      this.nombreCliente = "";
      this.cliente = undefined;
      this.datosPdf = {id:0,url:'',nota:'', fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado: 0, idUsuario: 0,
                                    idCliente: 0,  nombreCliente: '', rutCliente: '', giroCliente: '', direccionCliente: '', comunaCliente: '', ciudadCliente: '', contactoCliente: '', idEmpresa: 0};
                                    //, nombreEmpresa: '',rutEmpreasa: '', giroEmpresa : '', direccionEmpresa: '', comunaEmpresa: '', ciudadEmpresa: '', contactoEmpresa: ''
    })
  }
  async abrirDocumento(docto,datos){
    const modal = await this.modalCtrl.create({
      component: DocumentoPage,
      cssClass: 'modals',
      componentProps:{
        'docto' : docto,
        'datosPdf' : datos
      }
    });
    modal.onDidDismiss().then(modal=>{      });
    return await modal.present();
  }
  async verDocumento(datos){
    const modal = await this.modalCtrl.create({
      component: DocumentoPage,
      cssClass: 'modals',
      componentProps:{
        'docto' : datos['docto'],
        'emitido' : true,
        'datosPdf' : datos
      }
    });
    modal.onDidDismiss().then(modal=>{      });
    return await modal.present();
  }
  public actualizarCotizacion(){
    this.cotizacionService.actualizar(this.cotizacion,this.cotizacion.id).subscribe(cotizacion=>{
      //console.log(cotizacion);
      this.ngOnInit();
      this.cotizacion = {nota:'',url:'',id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0};
    })
  }
  public eliminacionLogica(){
    this.cotizacionService.eliminar(this.cotizacion,this.cotizacion.id).subscribe(datos=>{
      //console.log(datos);
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
    this.detalle = [];
    this.cliente = undefined;
    this.nombreCliente = "";
    this.cotizacion = {nota:'',url:'',id:0, idCliente:0, fechaEmision:new Date(), fechaCaducidad:new Date(), detalle:[], estado:0, idEmpresa:0, idUsuario:0};
  }

  async eliminar(opcion) {
    //console.log(this.cotizacion);
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UNA COTIZACION</strong>!!!',
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
    //console.log(this.cotizacion);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UNA COTIZACION</strong>!!!',
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
            this.actualizarCotizacion();
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmar() {
    //console.log(this.cotizacion);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estás a punto de <br><strong>Enviar un Cotización</strong>!!!',
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
            this.enviarPdf();
            //this.guardarCotizacion();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(cotizacion) {
    //console.log(cotizacion)
    var opcion = "Borrar";
    if(cotizacion.estado == 0){
      opcion = "Recuperar"
    }
    this.deshabilitarInputs(false);
    this.bandera=false;
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Ver',
        icon: 'eye',
        handler: () => {
          cotizacion.tipo=''+cotizacion.tipo;
          this.cotizacion = cotizacion;
          console.log(cotizacion);

          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
          this.traerCliente(cotizacion.id_cliente);
          /*this.detalleService.listar(cotizacion.id).subscribe(detalle=>{
            console.log(detalle);

            cotizacion.detalles = detalle;
            this.detalle = detalle;
          })*/
        }
      },
      {
        text: 'Ver documento',
        icon: 'document',
        handler: () => {
          console.log(cotizacion);
          this.verDocumento(cotizacion);
        }
      },{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.cotizacion = cotizacion;
          this.eliminar(opcion);
        }
      },{
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

  borrar(index){
    //console.log(index);
    var nuevo = [];
    for(let i = 0 ; i< this.detalle.length;i++){
      if(i != index){
        nuevo.push(this.detalle[i]);
      }
    }
    //console.log(nuevo);
    this.detalle = nuevo;
  }

  filtrarCotizaciones(){
    var cotizaciones = [];
    for(let i = 0 ; i < this.cotizaciones.length ; i ++){
      if(this.cotizaciones[i].estado){
        cotizaciones.push(this.cotizaciones[i]);
      }
    }
    return cotizaciones;
  }

  limpiar(){
    this.cliente = undefined;
    this.nombreCliente = "";
  }
}
