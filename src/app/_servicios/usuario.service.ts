import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Usuario{
  id : number;
  nombre : string;
  apellido : string;
  correo : string;
  clave : string;
  estado : number;
}

@Injectable()

export class UsuarioService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    var idEmpresa = sessionStorage.getItem("idEmpresa");
    return this.http.get<Usuario[]>(`${this.url}/api/usuarios/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',idEmpresa)
    });
  }
  login(usuario,clave){
    let cliente = {usuario:usuario,clave:clave};
    return this.http.post<Usuario>(`${this.url}/api/login/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  insertar(cliente : Usuario){
    return this.http.post<Usuario>(`${this.url}/api/usuarios/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:number,cliente : Usuario){
    return this.http.put<Usuario>(`${this.url}/api/usuarios/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,cliente : Usuario){

    if(cliente.estado == 0){
      cliente.estado = 1;
    }else{
      cliente.estado = 0;
    }

    return this.http.put<Usuario>(`${this.url}/api/usuarios/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Usuario>(`${this.url}/api/usuarios/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Usuario>(`${this.url}/api/usuarios/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
