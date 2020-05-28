import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { UsuarioService, Usuario } from '../_servicios/usuario.service';
import { EmpresaService, Empresa } from '../_servicios/empresa.service';
import { LoginService } from '../_servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})

export class RegistrarPage implements OnInit {
  flag=false;
  public usuario : Usuario = {id:0,nombre:'',apellido:'',correo:'',clave:'',estado:0};
  usuarios=[];
  bandera=0;
  empresas=[];
  empresaTemporal = {id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',estado:0,url:''};
  public empresa : Empresa = {id:0,nombre:'',rut:'',giro:'',direccion:'',ciudad:'', comuna:'',contacto:'',estado:0,url:''};

  constructor(private usuarioService : UsuarioService,
              private login : LoginService,
              private empresaService : EmpresaService,
              public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              public router: Router,
              private alertController :AlertController,) { }

  ngOnInit() {
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
    console.log(this.empresas);

    this.empresaService.listar().subscribe(e=>{
        this.empresas= e;
    })
  }

  cambiarPagina(){
    this.bandera=this.bandera+1;
  }

  volver(){
    this.bandera=this.bandera-1;
  }

  registroDatos(variable){
    console.log(this.empresaTemporal);
    if(!variable){
      this.empresaTemporal.nombre = '';
      this.empresaTemporal.rut = '';
      this.empresaTemporal.giro = '';
      console.log(this.empresaTemporal);
    }
  }

  registroContactos(variable){
    if(!variable){
      this.empresaTemporal.direccion = '';
      this.empresaTemporal.comuna = '';
      this.empresaTemporal.ciudad = '';
      this.empresaTemporal.contacto = '';
      console.log(this.empresaTemporal);
    }
  }

  registroUsuarios(variable){
    if(!variable){
      this.usuario = {id:0,nombre:'',apellido:'',correo:'',clave:'',estado:0};
    }
  }


  public guardarEmpresa(){
    this.empresa = this.empresaTemporal;
    this.empresaService.insertar(this.empresa).subscribe(empresa=>{
      this.login.setEmpresa(empresa['id']);
      console.log(empresa);
      this.guardarUsuario(empresa['id']);
      this.empresa = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',url:''};
    })

  }
  async mostrarToast() {
    const toast = await this.toastController.create({
       message: 'Usuario y Empresa creados correctamente',
       duration: 2000
     });
     toast.present();
   }

  public guardarUsuario(id){

    this.usuarioService.insertar(this.usuario).subscribe(usuario=>{
      this.mostrarToast();
      this.router.navigate(['/login'], {replaceUrl: true});
      this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:''};
    })
  }

  async confirmar() {
    //console.log(this.producto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>Registrarte</strong>!!!',
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

            this.guardarEmpresa();
          }
        }
      ]
    });

    await alert.present();
  }
}
