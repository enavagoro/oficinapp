import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { GastoService } from '../_servicios/gasto.service';
import { PERMISSION,UsuarioService } from '../_servicios/usuario.service';
import { TipoGastoService } from '../_servicios/tipo-gasto.service';
import { LoginService } from '../_servicios/login.service';
import { Storage } from '@ionic/storage';
import { CrearTipogastoPage } from './crear-tipogasto/crear-tipogasto.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})

export class GastosPage implements OnInit {
  file = File = null;
  gastos = [];

  public gasto = {img:'',estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
  URL = "http://161.35.98.48";
  tiposGastos = [];
  url : string;
  banderaUrl = false;
  cargando : boolean = false;
  bandera = false;
  permission : PERMISSION = {c:false,r:false,u:false,d:false};
  arregloInputs=[];

  constructor(
      private login : LoginService,
      public storage : Storage,
      private usuarioService : UsuarioService,
      public actionSheetController: ActionSheetController,
      private tipoGastoService : TipoGastoService,
      private gastoService:GastoService,
      private router : Router,
      private toastController : ToastController,
      private alertController :AlertController,
      private modalCtrl : ModalController) {
        this.storage.get('usuarios').then((val) => {
          if(val){
            var permission = this.usuarioService.tienePermiso(val,'gastos');
            if(permission){
              this.permission = permission;
              if(!permission.r){
                this.storage.clear();
                this.router.navigate(['/login'], {replaceUrl: true});
              }
            }
          }
        })
      }

  ngOnInit() {
    this.tipoGastoService.listar().then(servicio=>{
      servicio.subscribe(t=>{
            this.tiposGastos = t.filter(this.filtros);
      })
    })
    this.gastoService.listar().then(servicio=>{
      this.URL = this.gastoService.traerIp();
      console.log(this.url);
      servicio.subscribe(g=>{
            this.gastos = g;
      })
    })
  }
  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }
  filtros(gasto){
    if(gasto.estado){
      return true;
    }
    return false;
  }
  public guardarGasto(img){
    //console.log('entra');
    this.gasto.id = 0 + (this.gastos.length + 1);
    this.gasto.img = img;
    this.gastoService.insertar(this.gasto).subscribe(gasto=>{
      //console.log('entra2');
      this.ngOnInit();
      this.gasto = {img:'',estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
      this.url = "";
    })

  }
  public actualizarGasto(img){
    this.gasto.img = img;
    this.gastoService.actualizar(this.gasto.id,this.gasto).subscribe(gasto=>{
      //console.log(gasto);
      this.ngOnInit();
      this.gasto = {img:'',estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
    })
  }
  public eliminacionLogica(){
    this.gastoService.eliminar(this.gasto,this.gasto.id).subscribe(datos=>{
      //console.log(datos);

      this.gasto = {img:'',estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};

      this.ngOnInit();

    })
  }
  public verGasto(){
    this.gastoService.actualizar(this.gasto,this.gasto.id).subscribe(gasto=>{
      //console.log(gasto);
      this.ngOnInit();
      this.gasto = {img:'',estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
    })
  }
  public deshabilitarInputs(estado){
    var form = document.querySelector('form');
    for (let i=0; i<form.elements.length; i++)
    {
      (form.elements[i] as any).disabled=estado;
    }

    if(estado)
    {
      document.getElementById("seleccionador-archivo").classList.add('seleccionador-archivo-gris');
    }
    else{
      document.getElementById("seleccionador-archivo").classList.remove('seleccionador-archivo-gris');
    }
  }

  public cancelar(){
    this.bandera=false;
    this.vaciarArchivo();
    this.deshabilitarInputs(false);
    this.gasto = {img:'',estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
  }

  async eliminar(opcion) {
    //console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN GASTO</strong>!!!',
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
    //console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN GASTO</strong>!!!',
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
            this.uploadFile(true);
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    //console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>Agregar un Gasto</strong>!!!',
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
            this.uploadFile(false);
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(gasto) {
    console.log(gasto)
    var opcion = "Borrar";
    if(gasto.estado == 0){
      opcion = "Recuperar"
    }
    this.deshabilitarInputs(false);
    this.bandera=false;
    var ver = {
      text: 'Ver',
      icon: 'eye',
      handler: () => {
        gasto.tipo=''+gasto.tipo;
        this.gasto = gasto;
        this.deshabilitarInputs(true);
        this.bandera=true;
        var value = this.login.getEmpresa();
        if(gasto.img!='Sin Imagen'){
          this.url = this.URL+"/"+value+"/"+gasto.img;
        }
      }};
    var actualizar = {
      text: 'Actualizar',
      icon: 'sync',
      handler: () => {
        this.bandera=false;
        this.gasto = gasto;
        var value = this.login.getEmpresa();
        if(gasto.img!='Sin Imagen'){
          this.url = this.URL+"/"+value+"/"+gasto.img;
        }
      }
    };
    var duplicar = {
      text: 'Duplicar',
      icon: 'albums',
      handler: () => {
        this.bandera=false;
        gasto.id == 0;
        this.gasto = gasto;
        this.gasto.id = 0;
        //console.log(this.gasto);
      }
    };
    var borrar = {
      text: opcion,
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.bandera=false;
        this.gasto = gasto;
        this.eliminar(opcion);
      }
    };
    var cancelar = {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        //console.log('Cancel clicked');
      }
    }
    var botones = [ver];
    if(this.permission.u){
      botones.push(actualizar)
    }
    if(this.permission.c){
      botones.push(duplicar)
    }
    if(this.permission.d){
      botones.push(borrar);
    }
    botones.push(cancelar)
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: botones
    });
    await actionSheet.present();
  }
  filtrarGastos(){
    var gastos = [];
    for(let i = 0 ; i < this.gastos.length ; i ++){
      if(this.gastos[i].estado){
        gastos.push(this.gastos[i]);
      }
    }
    return gastos;
  }

  public subirArchivo(evento) {
    //console.log('entrando');
    this.file= evento.target.files[0];
  }

  public leerArchivo(evento){
    if (evento.target.files && evento.target.files[0]) {
      var lector = new FileReader();

      lector.readAsDataURL(evento.target.files[0]);

      lector.onload = (evento) => { // called once readAsDataURL is completed
        //console.log(evento)
        try {
          var pre = evento.target["result"];
            this.url = pre;

        } catch (error) {
            //console.log(error);

        }}
    }
  }

  public vaciarArchivo(){
    this.file = 0;
    this.url = '';
  }

  uploadFile(actualizar){

      this.cargando = true;
      var BaseClass = function (data) {
        Object.assign(this, data);
      };
      var info = {};
      var currentTime = new Date().getTime();
      //console.log(this.file);
      if(this.file){
        var formData = new FormData();
        var timestamp = new Date();
        var tipo = this.file.name.split('.').pop();
        var name = currentTime +"."+tipo;
        Object.defineProperty(this.file, 'name', {
          writable: true,
          value: name
        });
        //console.log(this.file);
        formData.append('name',name);
        formData.append('file',this.file);

        this.gastoService.guardar(formData);

        if(actualizar){
          this.actualizarGasto(name)
        }else{
          this.guardarGasto(name);
        }
      }else{
        if(actualizar){
            this.actualizarGasto("Sin imagen");
        }else{
            this.guardarGasto("Sin imagen");
        }

      }
    }

    async abrirTipoGasto() {

      const modal = await this.modalCtrl.create({
        component: CrearTipogastoPage,
        cssClass: 'modals',
        /*
        componentProps:{
          'detalle' : this.detalle
        }*/
      });

      modal.onDidDismiss().then(modal=>{
        console.log("haciendo pruebas");
        this.ngOnInit();
      });

      return await modal.present();

  }

}
