import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface TipoProducto{
  id:number;
  titulo:string;
  codigo:string;
}

@Injectable()

export class TipoProductoService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<TipoProducto[]>(`${this.url}/api/tipoProducto/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  insertar(tipoProducto : TipoProducto){
    return this.http.post<TipoProducto>(`${this.url}/api/tipoProducto/`,tipoProducto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,tipoProducto : TipoProducto){
    return this.http.patch<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, tipoProducto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:string){
    return this.http.delete<TipoProducto>(`${this.url}/api/tipoProducto/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
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
