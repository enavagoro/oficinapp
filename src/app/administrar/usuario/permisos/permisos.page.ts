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

  constructor(private modalCtrl : ModalController,private navParams : NavParams) {
    var usuario = navParams.get("usuario");
    var menu = usuario.menu;    
    if(menu && menu.length){
      this.menus = menu;
    }
  }
  ngOnInit() {
  }
  guardarPermisos(){
    this.modalCtrl.dismiss(this.menus);
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }


}
