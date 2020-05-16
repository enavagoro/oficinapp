import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { AppUtilService } from './_servicios/app-util.service';
import { StorageService } from './_servicios/storage.service';
import { LoginService } from './_servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
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
    {
      title: 'Administrar',
      url: '/administrar',
      icon: 'cog'
    },
  ];

  constructor(
    private loginService : LoginService,
    private sService : StorageService,
    private storage : Storage,
    private router : Router,
    private appUtil: AppUtilService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  cerrarSesion(){
    console.log("cerrar sesion");
    this.storage.clear();
    this.router.navigate(['/login'], {replaceUrl: true});
  }
  initializeApp() {
    this.platform.ready().then(() => {
      //this.checkFingerPrint();
      /*
      this.storage.get('idUsuario')
        .then((val) => {
          alert("idUsuario "+val);
        });


      if(sessionStorage.getItem('idUsuario')){
        this.router.navigate(['/home'])
      }else{
        this.router.navigate(['/login'])
      }
      */
      this.storage.get('usuarios').then((val) => {
        console.log(val);
        if(!val){
          this.router.navigate(['/login'], {replaceUrl: true})
        }else{
          this.loginService.setToken(val['token']);
          this.loginService.setEmpresa(val['empresa']);
        }
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
}
