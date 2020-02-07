import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class ProductoService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    var idEmpresa = sessionStorage.getItem("idEmpresa");
    return this.http.get<Producto[]>(`${this.url}/api/productos/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',idEmpresa)
    });
  }

  insertar(producto : Producto){
    producto.idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
    producto.idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    return this.http.post<Producto>(`${this.url}/api/productos/`,producto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:number,producto : Producto){
    return this.http.put<Producto>(`${this.url}/api/productos/${id}`, producto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,producto: Producto){

    if(producto.estado == 0){
      producto.estado = 1;
    }else{
      producto.estado = 0;
    }

    return this.http.put<Producto>(`${this.url}/api/productos/${id}`, producto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Producto>(`${this.url}/api/productos/${id}`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Producto>(`${this.url}/api/productos/${id}`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
