import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { UsuarioService, Usuario} from '../../_servicios/usuario.service';
import { PermisosPage } from './permisos/permisos.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarios = [];
  public usuario : Usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:'',menu:[]};
  bandera = false;
  flag = false;

  constructor(private usuarioService : UsuarioService,
              private storage : Storage,
              public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {}

  ngOnInit() {

    this.usuarioService.listar().then(servicio=>{
      servicio.subscribe(u=>{
        this.usuarios= u;
      })
    })
  }
   public guardarUsuario(){
    //console.log('entra');
    this.usuario.id = 0 + (this.usuarios.length + 1);
    this.usuarioService.insertar(this.usuario).then(servicio=>{
      servicio.subscribe(usuario=>{
        //console.log('entra2');
        this.ngOnInit();
        this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:'',menu:[]};
      })
    })

  }

  public actualizarUsuario(){
    this.usuarioService.actualizar(this.usuario,this.usuario.id).subscribe(usuario=>{
      //console.log(usuario);
      this.ngOnInit();
      this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:'',menu:[]};
    })
  }
  public eliminacionLogica(){
    this.usuarioService.eliminar(this.usuario,this.usuario.id).subscribe(datos=>{
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
    this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:'',menu:[]};
  }
  async eliminar(opcion) {
    //console.log(this.usuario);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>'+opcion+' UN USUARIO</strong>!!!',
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
    //console.log(this.usuario);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>ACTUALIZAR UN USUARIO</strong>!!!',
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
            this.actualizarUsuario();
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmar() {
    //console.log(this.usuario);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN USUARIO</strong>!!!',
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
            this.guardarUsuario();
          }
        }
      ]
    });

    await alert.present();
  }
  async opciones(usuario) {
    var opcion = "Borrar";
    if(usuario.estado == 0){
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
          usuario.tipo=''+usuario.tipo;
          this.usuario = usuario;
          this.deshabilitarInputs(true);
          this.bandera=true;
        }
      }, {
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.usuario = usuario;
        }
      },{
        text: 'Permisos',
        icon: 'albums',
        handler: () => {
          this.usuario = usuario;
          this.mostrarPermisos();
        }
      },{
        text: opcion,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.bandera=false;
          this.usuario = usuario;
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
  async mostrarPermisos(){
    const modal = await this.modalCtrl.create({
      component: PermisosPage,
      cssClass: 'modals',
      componentProps:{
        'usuario' : this.usuario
      }
    });
    modal.onDidDismiss().then(modal=>{
      console.log(modal);
      if(modal.data){
        this.usuario.menu = modal.data;
        this.storage.get('usuarios').then((val) => {
          if( val['_id'] == this.usuario['_id'] ){
            this.usuarioService.dropMenu();
            this.usuarioService.addMenu({title: 'Inicio',url: '/home',icon: 'home',principal:true,permission:{c:true,r:true,u:true,d:true}});
            for(var menu of this.usuario.menu ){
              if(menu.permission.r && menu.principal){
                this.usuarioService.addMenu(menu)
              }
            }
            this.storage.set('usuarios',this.usuario);
          }
        })
        this.actualizarUsuario();
      }
    });
    return await modal.present();
  }

  filtrarUsuarios(){
    var usuarios = [];
    for(let i = 0 ; i < this.usuarios.length ; i ++){
      if(this.usuarios[i].estado){
        usuarios.push(this.usuarios[i]);
      }
    }
    return usuarios;
  }
}
