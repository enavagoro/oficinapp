import { Component, OnInit, HostListener} from '@angular/core';
import { UsuarioService } from '../_servicios/usuario.service';
import { Router } from '@angular/router';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../_servicios/auth.service';
import { LoginService } from '../_servicios/login.service';
import { Storage } from '@ionic/storage';
import { AppUtilService } from '../_servicios/app-util.service';
import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../_servicios/validation.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    let codigoEnter = 13;

    if(event.keyCode == codigoEnter){
      this.login();
    }
  }

  usuario = "";
  fingerprintOptions : FingerprintOptions;
  clave = "";
  permitirDedo = false;
  loginForm;
  banderaMostrar = false;

  constructor(
    private loginService : LoginService,
    private fingerAuth: FingerprintAIO,
    private storage : Storage,
    private auth: AuthService,
    private appUtil: AppUtilService,
    public alertController: AlertController,
    public router: Router,
    public usuarioService : UsuarioService,
    private formBuilder : FormBuilder) {
      this.loginForm = this.formBuilder.group({
        correo : ['',[Validators.required,ValidationService.emailValidator]],
        clave : ['',Validators.required]
      })
    }
    ngAfterViewInit(){
      var menu = document.querySelector('ion-menu');
      menu.hidden = true;
    }
  ngOnInit() {
    this.storage.get('idUsuario')
      .then(
        data => {
          if(data){
              this.permitirDedo = true;
          }
        }
      );
  }

  loginWithFingerprint() {

    if (this.appUtil.isFingerprintAvailable) {
      this.appUtil.presentFingerPrint()
      .then((result: any) => {
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
    this.banderaMostrar = false;
    this.usuarioService.dropMenu();
    this.usuarioService.addMenu({title: 'Inicio',url: '/home',icon: 'home',principal:true,permission:{c:true,r:true,u:true,d:true}});
    
      this.auth.logUser(this.loginForm.value).then(servicio=>{
        servicio.subscribe(d=>{
          console.log(d);
          this.loginService.setToken(d['accessToken']);
          this.loginService.getUser(this.loginForm.value).then(lservice=>{
            lservice.subscribe(r=>{
              console.log(r);
              for(var usuario of r){
                if(usuario.menu){
                  for(var menu of usuario.menu){
                    if(menu.permission.r && menu.principal){
                      this.usuarioService.addMenu(menu)
                    }
                  }
                }else{
                  console.log("lol algo debe tener su menu creo sho");

                }                                
                usuario.token = d['accessToken'];
                this.loginService.setUser(usuario);
                this.loginService.setEmpresa(usuario.empresa);
                this.router.navigate(['/home']);
              }              
              this.usuarioService.addMenu({title: 'Reportes',url: '/reportes',icon: 'stats',principal:true,permission:{c:true,r:true,u:true,d:true}});

            })
          })
        },err=>{
          this.presentAlert();
        })
      })
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        subHeader: 'Error al iniciar',
        message: 'Tu dirección de correo electrónico o tu contraseña no son correctos',
        buttons: ['OK']
      });

      await alert.present();
    }

    cambiarBandera(){
      this.banderaMostrar = !this.banderaMostrar;
    }
}
