import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

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

  idEmpresa = 0;
  idUsuario = 0;
  constructor(private sService:StorageService,private http: HttpClient) {

  }

  async listar() {
    this.idEmpresa = await this.sService.getIdEmpresa();
    this.idUsuario = await this.sService.getIdUsuario();
    return this.http.get<Producto[]>(`${this.url}/api/productos/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(producto : Producto){

    return this.http.post<Producto>(`${this.url}/api/productos/`,producto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
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
