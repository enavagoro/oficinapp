import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ClienteService } from '../../_servicios/cliente.service';
import { LoginService } from '../../_servicios/login.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {

  clientes = [];
  public cliente  = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
  public producto  = {estado:0,id:0,titulo:'',precio:0,codigo:'',idEmpresa:0,idUsuario:0};
  bandera = false;
  banderaHistorial = true;
  fechaMenor;
  fechaMayor;
  clientesRespaldo = [];
  respaldoBuscar = [];
  buscar = '';
  arregloFiltrado = [];
  cantidadVisible : number = 10;

  constructor(public actionSheetController: ActionSheetController,
              private clienteService : ClienteService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController,
              private loginService : LoginService) {}

  ngOnInit() {
    this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
          this.clientes= c;
          this.clientesRespaldo = this.clientes;
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
    })
  }

  public actualizarCliente(){
    console.log(this.cliente);

    this.clienteService.actualizar(this.cliente.id,this.cliente).subscribe(cliente=>{
      //console.log(cliente);
      this.ngOnInit();
      this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
    })
  }

  public eliminacionLogica(){
    this.clienteService.eliminar(this.cliente,this.cliente.id).subscribe(datos=>{
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
    this.cliente = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
  }
  async eliminar(opcion) {
    //console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN CLIENTE</strong>!!!',
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
    //console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN CLIENTE</strong>!!!',
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
            this.actualizarCliente();
          }
        }
      ]
    });

    await alert.present();
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
  async opciones(cliente) {
    //console.log(cliente)
    var opcion = "Borrar";
    if(cliente.estado == 0){
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
          cliente.tipo=''+cliente.tipo;
          this.cliente = cliente;
          //console.log(cliente);
          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
        }
      }, {
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.cliente = cliente;
          //console.log(cliente);
        }
      },{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          cliente.id == 0;
          this.cliente = cliente;
          this.cliente.id = 0;
          //console.log(this.cliente);
        }
      }, {
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.cliente = cliente;
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
  filtrarClientes(){
    var clientes = [];
    for(let i = 0 ; i < this.clientes.length ; i ++){
      if(this.clientes[i].estado && i < this.cantidadVisible){
        clientes.push(this.clientes[i]);
      }
    }
    return clientes;
  }
  cambiarBandera(){
    console.log('entré');
    this.banderaHistorial = !this.banderaHistorial;
  }

  filtrarPorFecha(){
    this.clientes = this.clientesRespaldo;
    var arregloFiltrado = [];

      for(let cliente of this.clientes){
        let fechaCliente = new Date(cliente.createdAt);
        if(this.fechaMayor && this.fechaMenor)
        {
          let fechaMenor = new Date(this.fechaMenor);
          let fechaMayor = new Date(this.fechaMayor);
          if(fechaCliente >= fechaMenor && fechaCliente <= fechaMayor){
            arregloFiltrado.push(cliente);
          }
        }
        if(this.fechaMayor && !this.fechaMenor)
        {
          let fechaMayor = new Date(this.fechaMayor);
          if(fechaCliente <= fechaMayor){
            arregloFiltrado.push(cliente);
          }
        }
        if(!this.fechaMayor && this.fechaMenor)
        {
          let fechaMenor = new Date(this.fechaMenor);
          if(fechaCliente >= fechaMenor){
            arregloFiltrado.push(cliente);
          }
        }
    }
    console.log('arreglo filtrado',arregloFiltrado);
    this.arregloFiltrado = arregloFiltrado;
    this.clientes = arregloFiltrado;

    if(!this.fechaMayor && !this.fechaMenor){
      this.clientes = this.clientesRespaldo;
    }
  }

  limpiarFecha(tipo){
    console.log('entré',tipo);

    if(tipo=='mayor'){
      console.log('entré más adentro esta es la fecha a borrar',this.fechaMayor);
      this.fechaMayor = undefined;
      this.filtrarPorFecha();
    }
    if(tipo=='menor'){
      this.fechaMenor = undefined;
      this.filtrarPorFecha();
    }
  }

  filtrarLista(){
    this.clientes = [];

    console.log('este es el buscar',this.buscar);
//esto es de la funcion de fecha
    if(this.arregloFiltrado.length > 0){
      for(let cliente of this.arregloFiltrado){
        console.log('este es el cliente',cliente);
        for(var indice in cliente){
          console.log('este es el indice y el indice del cliente',indice,'cliente',cliente[indice]);

          if(typeof(cliente[indice]) == "string" ){
            if(cliente[indice].toUpperCase().includes(this.buscar.toUpperCase())){
              this.clientes.push(cliente);
              break;
            }
          }
        }
      }
    }

    if(this.arregloFiltrado.length == 0){
      for(let cliente of this.clientesRespaldo){
        console.log('este es el cliente',cliente);
        for(var indice in cliente){
          console.log('este es el indice y el indice del cliente',indice,'cliente',cliente[indice]);

          if(typeof(cliente[indice]) == "string" ){
            if(cliente[indice].toUpperCase().includes(this.buscar.toUpperCase())){
              this.clientes.push(cliente);
              break;
            }
          }
        }
      }
    }

    if(this.buscar == ""){
      this.filtrarPorFecha();
    }
  }

  asignarFechaString(cliente){
    var texto = new Date(cliente.createdAt).toLocaleDateString();
    return "Creado el: "+ texto +" ("+cliente.nombre+")";
  }

/* no funca esta verga
  subir(){
    console.log('windows',window);
    window.scrollTo(0,0);
    window.focus();
  }
  */
  aumentarCantidad(){
    this.cantidadVisible += 10;
  }

  disminuirCantidad(){
    this.cantidadVisible -= 10;
  }
}
