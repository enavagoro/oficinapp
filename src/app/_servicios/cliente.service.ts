import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductoService, Producto } from '../_servicios/producto.service';
import { Storage } from '@ionic/storage';

export interface Cliente {
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
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

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

export class ClienteService {

  private url: string = "http://178.128.71.20:3500";

  idEmpresa = 0;
  idUsuario = 0;
  constructor(private http: HttpClient,private storage : Storage) {
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value;
    });
    this.storage.get('idEmpresa').then((value)=>{
      this.idEmpresa = value;
    });
  }

  listar() {
    var idEmpresa = sessionStorage.getItem("idEmpresa");
    console.log(idEmpresa);
    return this.http.get<Cliente[]>(`${this.url}/api/clientes/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(cliente : Cliente){
    cliente.idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
    cliente.idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    return this.http.post<Cliente>(`${this.url}/api/clientes/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });

  }

  actualizar(id:number,cliente : Cliente){
    return this.http.put<Cliente>(`${this.url}/api/clientes/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,cliente : Cliente){

    if(cliente.estado == 0){
      cliente.estado = 1;
    }else{
      cliente.estado = 0;
    }

    return this.http.put<Cliente>(`${this.url}/api/clientes/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Cliente>(`${this.url}/api/clientes/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Cliente>(`${this.url}/api/clientes/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
