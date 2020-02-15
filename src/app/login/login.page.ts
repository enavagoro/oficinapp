import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_servicios/usuario.service';
import { Router } from '@angular/router';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthenticationService } from '../_servicios/authentication.service';
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
  constructor(private fingerAuth: FingerprintAIO,
    private storage : Storage,
    private authenticationService: AuthenticationService,
    private appUtil: AppUtilService,
    //private nativeStorage:NativeStorage,
    public router: Router,public usuarioService : UsuarioService) { }

  ngOnInit() {
    this.storage.get('idUsuario')
      .then(
        data => {
          //this.router.navigate(['/gastos'])
          this.permitirDedo = true;
        }
      );
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
  }

  loginWithFingerprint() {

    if (this.appUtil.isFingerprintAvailable) {
      this.appUtil.presentFingerPrint()
      .then((result: any) => {
        alert(result);
        //window.location.href = "/gastos";
        this.router.navigate(['/home'], {replaceUrl: true});
      })
      .catch((error: any) => {
        alert("ERROR");
        console.error('fingerprint : ', 'error');
      });
    }

  }
  async alert(){
    this.storage.get('usuario').then((value) => {
      alert(value.nombre);
    });
    this.storage.get('idUsuario').then((value) => {
      alert("idusuario : "+value);
    });
    this.storage.get('idEmpresa').then((value)=>{
      alert("idEmpresa : "+value);
    });

  }
  async login(){
    this.authenticationService.login(this.usuario,this.clave).then(datos=>{
      console.log(datos);
      var i = 0 ;
      var datas = []
      for(let obj in datos){
        i++;
        datas.push(obj) ;
      }
      if(i == 0){
        alert("mal iniciado");
      }else{
        var usuario = datos[datas[0]][0].id;
        var empresa = datos[datas[1]][0].id;
        this.storage.set('idUsuario', usuario);
        this.storage.set('idEmpresa', empresa)
        console.log(usuario);
        console.log(empresa);
        this.router.navigate(['/home'], {replaceUrl: true});
      }
    })
  }
}
