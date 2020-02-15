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

  constructor(private usuarioService : UsuarioService,
              public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {}

              ngOnInit() {
                this.usuarioService.listar().subscribe(usuarios=>{
                  usuarios.subscribe(u=>{
                    this.usuarios= u;
                  })                  
                })
              }

              public guardarUsuario(){
                console.log('entra');
                this.usuario.id = 0 + (this.usuarios.length + 1);
                this.usuarioService.insertar(this.usuario).subscribe(usuario=>{
                  console.log('entra2');
                  this.ngOnInit();
                  this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
                })

              }

              public actualizarUsuario(){
                this.usuarioService.actualizar(this.usuario.id,this.usuario).subscribe(usuario=>{
                  console.log(usuario);
                  this.ngOnInit();
                  this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
                })
              }
              public eliminacionLogica(){
                this.usuarioService.borrar(this.usuario.id,this.usuario).subscribe(datos=>{
                  console.log(datos);
                  this.ngOnInit();
                })
              }
              async eliminar(opcion) {
                console.log(this.usuario);

                const alert = await this.alertController.create({
                  header: 'Favor confirmar!',
                  message: 'Estas a punto de <br><strong>'+opcion+' UN USUARIO</strong>!!!',
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
                console.log(this.usuario);

                const alert = await this.alertController.create({
                  header: 'Favor confirmar!',
                  message: 'Estas a punto de <br><strong>ACTUALIZAR UN USUARIO</strong>!!!',
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
                        this.actualizarUsuario();
                      }
                    }
                  ]
                });

                await alert.present();
              }
              async confirmar() {
                console.log(this.usuario);

                const alert = await this.alertController.create({
                  header: 'Favor confirmar!',
                  message: 'Estas a punto de <br><strong>CREAR UN USUARIO</strong>!!!',
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
                        this.guardarUsuario();
                      }
                    }
                  ]
                });

                await alert.present();
              }
              async opciones(usuario) {
                console.log(usuario)
                var opcion = "BORRAR";
                if(usuario.estado == 0){
                  opcion = "RECUPERAR"
                }
                const actionSheet = await this.actionSheetController.create({
                  header: 'Albums',
                  buttons: [{
                    text: opcion,
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                      this.usuario = usuario;
                      this.eliminar(opcion);
                    }
                  }, {
                    text: 'Actualizar',
                    icon: 'share',
                    handler: () => {
                      this.usuario = usuario;
                      console.log(usuario);
                    }
                  },{
                    text: 'Duplicar',
                    icon: 'heart',
                    handler: () => {
                      usuario.id == 0;
                      this.usuario = usuario;
                      this.usuario.id = 0;
                      console.log(this.usuario);
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
