import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { AppUtilService } from './_servicios/app-util.service';
import { StorageService } from './_servicios/storage.service';
//import { NotificationService } from './_servicios/notification.service';
import { UsuarioService } from './_servicios/usuario.service';
import { LoginService } from './_servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  public appPages = [ ];
  /*
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Ventas',
      url: '/ventas',
      icon: 'pricetags'
    },
    {
      title: 'Gastos',
      url: '/gastos',
      icon: 'bicycle'
    },
    {
      title: 'Cotizaciones',
      url: '/cotizaciones',
      icon: 'paper'
    },

    /*
    {
      title: 'Tienda',
      url: '/tienda',
      icon: 'cart'
    },
    {
      title: 'Administrar',
      url: '/administrar',
      icon: 'cog'
    },

  ];*/

  constructor(
    //private notificacion : NotificationService,
    private loginService : LoginService,
    private usuarioService : UsuarioService,
    private sService : StorageService,
    private storage : Storage,
    private router : Router,
    private appUtil: AppUtilService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    var self = this;

    /*
    notificacion.setSocket().then(servicio=>{
      console.log(servicio);
      self.notificacion
        .getNotif()
        .subscribe((res: string) => {
          console.log("voy a mandar una notificacion");
        });
    })
    */

  }
  cerrarSesion(){
    console.log("cerrar sesion");
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
    this.storage.clear();
    this.router.navigate(['/login'], {replaceUrl: true});
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('usuarios').then((val) => {
        console.log(val);
        if(!val){
          this.router.navigate(['/login'], {replaceUrl: true})
          this.subscription = this.usuarioService.getMenu().subscribe(data => {
            if (data) {
              this.appPages.push(data.menu);
            } else {
              this.appPages = [];
            }
          });
        }else{
          this.appPages.push({title: 'Inicio',url: '/home',icon: 'home'});
          this.subscription = this.usuarioService.getMenu().subscribe(data => {
            if (data) {
              this.appPages.push(data.menu);
            } else {
              this.appPages = [];
            }
          });
          for(var menu of val['menu']){
            if(menu.permission.r && menu.principal){
              this.usuarioService.addMenu(menu)
            }
          }
          
          this.loginService.setToken(val['token']);
          this.loginService.setEmpresa(val['empresa']);
        }
        this.appPages.push({title: 'Reportes',url: '/reportes',icon: 'stats'});
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  checkFingerPrint() {

    if (this.appUtil.isFingerprintAvailable) {
      this.appUtil.presentFingerPrint()
      .then((result: any) => {
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        console.error('fingerprint : ', 'error');
      });
    }
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
