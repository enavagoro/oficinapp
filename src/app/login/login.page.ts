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
    if(sessionStorage.getItem('user')){
      this.router.navigate(['/home'])
    }
  }
  login(){
    this.usuarioService.login(this.usuario,this.clave).subscribe(datos=>{
      console.log(datos);
      if(datos){
        alert("mal iniciado");
      }else{
        sessionStorage.setItem('user', JSON.stringify(datos));
        this.router.navigate(['/home']);
      }
    })
  }
}
