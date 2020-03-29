import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductoService, Producto } from '../_servicios/producto.service';
import { StorageService } from './storage.service';

export interface Cotizacion {
  id: number;
  idCliente: number;
  fechaEmision: Date;
  fechaCaducidad: Date;
  detalle : Array<Producto>;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class CotizacionService {

  private url: string = "http://178.128.71.20:3500";
  idEmpresa = '';
  idUsuario = '';
  constructor(private sService:StorageService,private http: HttpClient) {

   }

  async listar() {
    this.idEmpresa = (await this.sService.getIdEmpresa()).toString();
    this.idUsuario = (await this.sService.getIdUsuario()).toString();
    return this.http.get<Cotizacion[]>(`${this.url}/api/cotizaciones/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(cotizacion : Cotizacion){

    return this.http.post<Cotizacion>(`${this.url}/api/cotizaciones/`,cotizacion, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  actualizar(id:number,cotizacion : Cotizacion){
    return this.http.put<Cotizacion>(`${this.url}/api/cotizaciones/${id}`, cotizacion,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,cotizacion: Cotizacion){

    if(cotizacion.estado == 0){
      cotizacion.estado = 1;
    }else{
    cotizacion.estado = 0;
    }

    return this.http.put<Cotizacion>(`${this.url}/api/cotizaciones/${id}`, cotizacion,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Cotizacion>(`${this.url}/api/cotizaciones/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Cotizacion>(`${this.url}/api/cotizaciones/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
