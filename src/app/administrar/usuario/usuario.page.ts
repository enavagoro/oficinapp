import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { UsuarioService, Usuario} from '../../_servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarios = [];
  public usuario : Usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
  bandera = false;
  flag = false;

  constructor(private usuarioService : UsuarioService,
              public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {}

  ngOnInit() {

    this.usuarioService.listar().subscribe(u=>{
      this.usuarios= u;
    })
  }
   public guardarUsuario(){
    //console.log('entra');
    this.usuario.id = 0 + (this.usuarios.length + 1);
    this.usuarioService.insertar(this.usuario).subscribe(usuario=>{
      //console.log('entra2');
      this.ngOnInit();
      this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
    })

  }

  public actualizarUsuario(){
    this.usuarioService.actualizar(this.usuario,this.usuario.id).subscribe(usuario=>{
      //console.log(usuario);
      this.ngOnInit();
      this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
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
    this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
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
    //console.log(usuario)
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
          //console.log(usuario);
          //console.log('bandera',this.bandera);
          this.deshabilitarInputs(true);
          this.bandera=true;
        }
      }, {
        text: 'Actualizar',
        icon: 'sync',
        handler: () => {
          this.bandera=false;
          this.usuario = usuario;
          //console.log(usuario);
        }
      },/*{
        text: 'Duplicar',
        icon: 'albums',
        handler: () => {
          this.bandera=false;
          usuario.id == 0;
          this.usuario = usuario;
          this.usuario.id = 0;
          //console.log(this.usuario);
        }
      },*/ {
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
