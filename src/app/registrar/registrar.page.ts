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
  public usuario : Usuario = {id:0,nombre:'',apellido:'',correo:'',clave:'',estado:0,menu:[]};
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
      this.usuario = {id:0,nombre:'',apellido:'',correo:'',clave:'',estado:0,menu:[]};
    }
  }


  public guardarEmpresa(){
    this.empresa = this.empresaTemporal;
    this.empresaService.insertar(this.empresa).then(servicio=>{
      servicio.subscribe(empresa=>{
        this.login.setEmpresa(empresa['id']);
        console.log(empresa);
        this.guardarUsuario(empresa['id']);
        this.empresa = {estado:0,id:0,nombre:'',rut:'',giro:'',direccion:'',comuna:'',ciudad:'',contacto:'',url:''};
      })
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
    this.usuario.menu = [
      {title:'Ventas',permission:{c:true,r:true,u:true,d:true},url:'ventas',icon:'barcode',principal:true},
      {title:'Gastos',permission:{c:true,r:true,u:true,d:true},url:'gastos',icon:'cog',principal:true},
      {title:'Cotizaciones',permission:{c:true,r:true,u:true,d:true},url:'cotizaciones',icon:'cog',principal:true},
      {title:'Administrar',permission:{c:true,r:true,u:true,d:true},url:'administrar',icon:'cog',principal:true},
      {title:'Administrar : Cliente',permission:{c:true,r:true,u:true,d:true},url:'administrar/cliente',icon:'https://image.flaticon.com/icons/svg/1602/1602619.svg',principal:false},
      {title:'Administrar : Producto',permission:{c:true,r:true,u:true,d:true},url:'administrar/producto',icon:'https://image.flaticon.com/icons/svg/359/359399.svg',principal:false},
      {title:'Administrar : Tipo de gasto',permission:{c:true,r:true,u:true,d:true},url:'administrar/tipo-gasto',icon:'https://image.flaticon.com/icons/svg/609/609147.svg',principal:false},
      {title:'Administrar : Tipo de producto',permission:{c:true,r:true,u:true,d:true},url:'administrar/tipo-producto',icon:'https://image.flaticon.com/icons/svg/1311/1311359.svg',principal:false},
      {title:'Administrar : Usuario',permission:{c:true,r:true,u:true,d:true},url:'administrar/usuario',icon:'https://image.flaticon.com/icons/svg/1602/1602721.svg',principal:false},      
    ]
    this.usuarioService.insertar(this.usuario).then(servicio=>{
      servicio.subscribe(usuario=>{
        this.mostrarToast();
        this.router.navigate(['/login'], {replaceUrl: true});
        this.usuario = {estado:0,id:0,nombre:'',apellido:'',correo:'',clave:'',menu:[]};
      })
    })
  }
  validarCorreo(event){
    console.log(event)
    this.usuarioService.existe(this.usuario.correo).subscribe(res=>{
      if(res['size']){
        this.usuario.correo = "";
        alert("Este correo ya se encuentra en uso");
      }else{
        console.log("super!");
        
      }
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
