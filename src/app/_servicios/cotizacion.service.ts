import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductoService, Producto } from '../_servicios/producto.service';

export interface Cotizacion {
  id: number;
  usuario: number;
  fecha: Date;
  detalle : Array<Producto>;
}

@Injectable()

export class CotizacionService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cotizacion[]>(`${this.url}/api/cotizacion/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  insertar(gasto : Cotizacion){
    return this.http.post<Cotizacion>(`${this.url}/api/cotizacion/`,gasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,gasto : Cotizacion){
    return this.http.patch<Cotizacion>(`${this.url}/api/cotizacion/${id}`, gasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:string){
    return this.http.delete<Cotizacion>(`${this.url}/api/cotizacion/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Cotizacion>(`${this.url}/api/cotizacion/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Cotizacion>(`${this.url}/api/cotizacion/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}