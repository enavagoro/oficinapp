import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_servicios/usuario.service';
import { Router } from '@angular/router';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../_servicios/auth.service';
import { LoginService } from '../_servicios/login.service';
import { Storage } from '@ionic/storage';
import { AppUtilService } from '../_servicios/app-util.service';
import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = "";
  fingerprintOptions : FingerprintOptions;
  clave = "";
  permitirDedo = false;
  constructor(
    private loginService : LoginService,
    private fingerAuth: FingerprintAIO,
    private storage : Storage,
    private auth: AuthService,
    private appUtil: AppUtilService,
    //private nativeStorage:NativeStorage,
    public router: Router,public usuarioService : UsuarioService) { }

  ngOnInit() {
    this.storage.get('idUsuario')
      .then(
        data => {
          //this.router.navigate(['/gastos'])
          if(data){
              this.permitirDedo = true;
          }
        }
      );
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
  }

  loginWithFingerprint() {

    if (this.appUtil.isFingerprintAvailable) {
      this.appUtil.presentFingerPrint()
      .then((result: any) => {
        //window.location.href = "/gastos";
        this.router.navigate(['/home'], {replaceUrl: true});
      })
      .catch((error: any) => {
        alert("ERROR");
        console.error('fingerprint : ', 'error');
      });
    }

  }
  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.login();
    }
  }

  async login(){
    var login = {correo : this.usuario , clave : this.clave};
    this.auth.login(login).subscribe(d=>{
      console.log(d);
      this.loginService.setToken(d['accessToken']);
      this.loginService.getUser(login).subscribe(r=>{
        console.log(r);
        for(var usuario of r){
          usuario.token = d['accessToken'];
          this.loginService.setUser(usuario);
          this.loginService.setEmpresa(usuario.empresa);
          this.router.navigate(['/home']);
        }

      })
    })
  }
}
