import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductoService, Producto } from '../_servicios/producto.service';

export interface Detalle {
  id: number;
  id_producto: number;
  titulo: string;
  precio : number;
  cantidad: number;
  id_venta: number;
}

@Injectable()

export class DetalleService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar(id) {
    return this.http.get<Detalle[]>(`${this.url}/api/ventas/detalle/${id}`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
/*
  insertar(detalle : Detalle){
    return this.http.post<Detalle>(`${this.url}/api/ventas/detalle/`,detalle, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')

    });
  }

  actualizar(id:number,detalle : Detalle){
    return this.http.put<Detalle>(`${this.url}/api/ventas/detalle/${id}`, detalle,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,detalle: Detalle){

    return this.http.put<Detalle>(`${this.url}/api/ventas/detalle/${id}`, detalle,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Detalle>(`${this.url}/api/ventas/detalle/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Detalle>(`${this.url}/api/ventas/detalle/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
*/
}
