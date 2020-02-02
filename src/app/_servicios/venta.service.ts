import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface Venta {
  id: number;
  id_cliente: number;
  fecha: Date;
  detalles : Array<Producto>;
}
interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
}

@Injectable()

export class VentaService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Venta[]>(`${this.url}/api/ventas/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  insertar(venta : Venta){
    return this.http.post<Venta>(`${this.url}/api/ventas/`,venta, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,venta : Venta){
    return this.http.patch<Venta>(`${this.url}/api/ventas/${id}`, venta,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:string){
    return this.http.delete<Venta>(`${this.url}/api/ventas/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Venta>(`${this.url}/api/ventas/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Venta>(`${this.url}/api/ventas/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
