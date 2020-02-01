import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface Cliente {
  id: number;
  nombre: string;
  rut: string;
  giro: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  contacto: string;
  tipoCompra: number;
  detalle : Array<Producto>;
}

interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
}

@Injectable()

export class ClienteService {

  private url: string = "http://192.168.0.14:3500";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(`${this.url}/api/clientes/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  insertar(cliente : Cliente){
    return this.http.post<Cliente>(`${this.url}/api/clientes/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,cliente : Cliente){
    return this.http.patch<Cliente>(`${this.url}/api/clientes/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:string){
    return this.http.delete<Cliente>(`${this.url}/api/clientes/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Cliente>(`${this.url}/api/cliente${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Cliente>(`${this.url}/api/cliente${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
