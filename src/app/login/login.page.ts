import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = "";
  clave = "";
  constructor(public router: Router,public usuarioService : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.getItem('idUsuario')){
      this.router.navigate(['/home'])
    }
  }
  login(){
    this.usuarioService.login(this.usuario,this.clave).subscribe(datos=>{
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
        sessionStorage.setItem('idUsuario', usuario);
        sessionStorage.setItem('idEmpresa',empresa);
        console.log(usuario);
        console.log(empresa);
        this.router.navigate(['/home']);
      }
    })
  }
}
