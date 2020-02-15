import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductoService, Producto } from '../_servicios/producto.service';
import { StorageService } from './storage.service';

export interface Venta {
  id: number;
  id_cliente: number;
  fecha: Date;
  detalles : Array<Producto>;
  TipoDocumento: number;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class VentaService {

  private url: string = "http://178.128.71.20:3500";
  idEmpresa = 0;

  idUsuario = 0;
  constructor(private sService:StorageService,private http: HttpClient) {

  }

  async listar() {
    this.idEmpresa = await this.sService.getIdEmpresa();
    this.idUsuario = await this.sService.getIdUsuario();
    return this.http.get<Venta[]>(`${this.url}/api/ventas/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(venta : Venta){
    console.log(this.idEmpresa);
    return this.http.post<Venta>(`${this.url}/api/ventas/`,venta, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  actualizar(id:number,venta : Venta){
    return this.http.put<Venta>(`${this.url}/api/ventas/${id}`, venta,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,venta: Venta){

    if(venta.estado == 0){
      venta.estado = 1;
    }else{
    venta.estado = 0;
    }

    return this.http.put<Venta>(`${this.url}/api/ventas/${id}`, venta,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
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
