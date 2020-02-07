import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface TipoProducto{
  id:number;
  titulo:string;
  codigo:string;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class TipoProductoService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    var idEmpresa = sessionStorage.getItem("idEmpresa");
    return this.http.get<TipoProducto[]>(`${this.url}/api/tipoProducto/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',idEmpresa)
    });
  }

  insertar(tipoProducto : TipoProducto){
    tipoProducto.idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
    tipoProducto.idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    return this.http.post<TipoProducto>(`${this.url}/api/tipoProducto/`,tipoProducto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:number,tipoProducto : TipoProducto){
    return this.http.put<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, tipoProducto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,tipoProducto: TipoProducto){

    if(tipoProducto.estado == 0){
      tipoProducto.estado = 1;
    }else{
    tipoProducto.estado = 0;
    }

    return this.http.put<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, tipoProducto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
