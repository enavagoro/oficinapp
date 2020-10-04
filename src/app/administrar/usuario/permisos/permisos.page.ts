import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams,ToastController,AlertController,ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {
  menus = [
    {title:'Ventas',permission:{c:true,r:true,u:true,d:true},url:'ventas',icon:'barcode',principal:true},
    {title:'Gastos',permission:{c:true,r:true,u:true,d:true},url:'gastos',icon:'cog',principal:true},
    {title:'Cotizaciones',permission:{c:true,r:true,u:true,d:true},url:'cotizaciones',icon:'cog',principal:true},
    {title:'Administrar',permission:{c:true,r:true,u:true,d:true},url:'administrar',icon:'cog',principal:true},
    {title:'Administrar : Cliente',permission:{c:true,r:true,u:true,d:true},url:'administrar/cliente',icon:'https://image.flaticon.com/icons/svg/1602/1602619.svg',principal:false},
    {title:'Administrar : Producto',permission:{c:true,r:true,u:true,d:true},url:'administrar/producto',icon:'https://image.flaticon.com/icons/svg/359/359399.svg',principal:false},
    {title:'Administrar : Tipo de gasto',permission:{c:true,r:true,u:true,d:true},url:'administrar/tipo-gasto',icon:'https://image.flaticon.com/icons/svg/609/609147.svg',principal:false},
    {title:'Administrar : Tipo de producto',permission:{c:true,r:true,u:true,d:true},url:'administrar/tipo-producto',icon:'https://image.flaticon.com/icons/svg/1311/1311359.svg',principal:false},
    {title:'Administrar : Usuario',permission:{c:true,r:true,u:true,d:true},url:'administrar/usuario',icon:'https://image.flaticon.com/icons/svg/1602/1602721.svg',principal:false},
    //{title:'Fisalis : Sucursales',permission:{c:true,r:true,u:true,d:true},url:'administrar/pos',icon:'cog',principal:false},
  ]
  respaldoMenu = [
      {title:'Ventas',permission:{c:true,r:true,u:true,d:true},url:'ventas',icon:'barcode',principal:true},
      {title:'Gastos',permission:{c:true,r:true,u:true,d:true},url:'gastos',icon:'cog',principal:true},
      {title:'Cotizaciones',permission:{c:true,r:true,u:true,d:true},url:'cotizaciones',icon:'cog',principal:true},
      {title:'Administrar',permission:{c:true,r:true,u:true,d:true},url:'administrar',icon:'cog',principal:true},
      {title:'Administrar : Cliente',permission:{c:true,r:true,u:true,d:true},url:'administrar/cliente',icon:'https://image.flaticon.com/icons/svg/1602/1602619.svg',principal:false},
      {title:'Administrar : Producto',permission:{c:true,r:true,u:true,d:true},url:'administrar/producto',icon:'https://image.flaticon.com/icons/svg/359/359399.svg',principal:false},
      {title:'Administrar : Tipo de gasto',permission:{c:true,r:true,u:true,d:true},url:'administrar/tipo-gasto',icon:'https://image.flaticon.com/icons/svg/609/609147.svg',principal:false},
      {title:'Administrar : Tipo de producto',permission:{c:true,r:true,u:true,d:true},url:'administrar/tipo-producto',icon:'https://image.flaticon.com/icons/svg/1311/1311359.svg',principal:false},
      {title:'Administrar : Usuario',permission:{c:true,r:true,u:true,d:true},url:'administrar/usuario',icon:'https://image.flaticon.com/icons/svg/1602/1602721.svg',principal:false},
      //{title:'Fisalis : Sucursales',permission:{c:true,r:true,u:true,d:true},url:'administrar/pos',icon:'cog',principal:false},
    ]

  banderas = [];
  banderaToggle = {c:false,r:false,u:false,d:false};
  banderaOpciones = false;

  constructor(private modalCtrl : ModalController,private navParams : NavParams) {
  }

  ngOnInit() {
    var usuario = this.navParams.get("usuario");
    var menu = usuario.menu;
    if(menu && menu.length){
      this.menus = menu;
      this.respaldoMenu = this.menus;
    }

    let i = 0;

    this.banderas.length = this.menus.length;
    this.banderas[i] = true;
  }

  guardarPermisos(){
    this.modalCtrl.dismiss(this.menus);
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  cambiarBandera(){
    this.banderaOpciones = !this.banderaOpciones;
  }

  cambioMasivo(accion){
    this.activarMenus();
    this.igualarToggles(accion);

    for(let menu of this.menus){
      if(accion == 'c'){
        menu.permission.c = this.banderaToggle.c;
      }
      if(accion == 'r'){
        menu.permission.r = this.banderaToggle.r;
      }
      if(accion == 'u'){
        menu.permission.u = this.banderaToggle.u;
      }
      if(accion == 'd'){
        menu.permission.d = this.banderaToggle.d;
      }
    }
  }

  igualarToggles(accion){
    if(accion == 'c'){
      this.banderaToggle.c = !this.banderaToggle.c;
    }
    if(accion == 'r'){
      this.banderaToggle.r = !this.banderaToggle.r;
    }
    if(accion == 'u'){
      this.banderaToggle.u = !this.banderaToggle.u;
    }
    if(accion == 'd'){
      this.banderaToggle.d = !this.banderaToggle.d;
    }
  }

  activarMenus(){
    console.log('banderas',this.banderas);
    for(var i = 0; i<this.banderas.length; i++){
      this.banderas[i] = true;
    }
  }

  cancelar(){
    console.log('entrar',this.menus);

    this.menus = this.respaldoMenu;
  }
}
