import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { GastoService, Gasto } from '../_servicios/gasto.service';
import { TipoGastoService, TipoGasto } from '../_servicios/tipo-gasto.service';
import { Storage } from '@ionic/storage';
const URL = "http://178.128.71.20:3950/";

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})

export class GastosPage implements OnInit {
  file = File = null;
  gastos = [];

  public gasto : Gasto = {estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};

  tiposGastos = [];
  url : string;
  cargando : boolean = false;

  constructor(
      public storage : Storage,
      public actionSheetController: ActionSheetController,
      private tipoGastoService : TipoGastoService,
      private gastoService:GastoService,
      private toastController : ToastController,
      private alertController :AlertController,
      private modalCtrl : ModalController) { }

  ngOnInit() {
    this.tipoGastoService.listar().subscribe(tipos=>{
      this.tiposGastos = tipos.filter(this.filtros);
    })
    this.gastoService.listar().subscribe(gastos =>{
      this.gastos = gastos;
    })
  }
  filtros(gasto){
    if(gasto.estado){
      return true;
    }
    return false;
  }
  public guardarGasto(img){
    console.log('entra');
    this.gasto.id = 0 + (this.gastos.length + 1);
    this.gasto.img = img;
    this.gastoService.insertar(this.gasto).subscribe(gasto=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.gasto = {estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
  }
  public actualizarGasto(){
    this.gastoService.actualizar(this.gasto.id,this.gasto).subscribe(gasto=>{
      console.log(gasto);
      this.ngOnInit();
      this.gasto = {estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};
    })
  }
  public eliminacionLogica(){
    this.gastoService.borrar(this.gasto.id,this.gasto).subscribe(datos=>{
      console.log(datos);

      this.gasto = {estado:0,id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date(), documento: 0,idEmpresa:0,idUsuario:0,tipoDocumento:0};

      this.ngOnInit();

    })
  }
  async eliminar(opcion) {
    console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN GASTO</strong>!!!',
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
    console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN GASTO</strong>!!!',
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
            this.actualizarGasto();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>Agregar un Gasto</strong>!!!',
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
            this.uploadFile();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(gasto) {
    console.log(gasto)
    var opcion = "BORRAR";
    if(gasto.estado == 0){
      opcion = "RECUPERAR"
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.gasto = gasto;
          this.eliminar(opcion);
        }
      }, {
        text: 'Actualizar',
        icon: 'share',
        handler: () => {
          this.gasto = gasto;
          this.storage.get('idEmpresa').then((value) => {
            this.url = URL+"/"+value+"/"+gasto.img;
          });

          console.log(gasto);
        }
      },{
        text: 'Duplicar',
        icon: 'heart',
        handler: () => {
          gasto.id == 0;
          this.gasto = gasto;
          this.gasto.id = 0;
          console.log(this.gasto);
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
    console.log('entrando');
    this.file= evento.target.files[0];
  }

  public leerArchivo(evento){
    if (evento.target.files && evento.target.files[0]) {
      var lector = new FileReader();

      lector.readAsDataURL(evento.target.files[0]);

      lector.onload = (evento) => { // called once readAsDataURL is completed
        console.log(evento)
        try {
          var pre = evento.target["result"];
            this.url = pre;

        } catch (error) {
            console.log(error);

        }}
    }
  }

  public vaciarArchivo(){
    this.file = 0;
  }
  uploadFile(){

      this.cargando = true;
      var BaseClass = function (data) {
        Object.assign(this, data);
      };
      var info = {};
      var currentTime = new Date().getTime();
      console.log(this.file);
      if(this.file){
        var formData = new FormData();
        var timestamp = new Date();
        var tipo = this.file.name.split('.').pop();
        var name = currentTime +"."+tipo;
        Object.defineProperty(this.file, 'name', {
          writable: true,
          value: name
        });
        console.log(this.file);
        formData.append('name',name);
        formData.append('file',this.file);

        this.gastoService.guardar(formData);
        this.guardarGasto(name);
      }else{
        this.guardarGasto("Sin imagen");
      }
    }

}
