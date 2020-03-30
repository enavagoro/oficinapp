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

export interface DatosPdf{
  id: number;
  fechaEmision: Date;
  fechaCaducidad: Date;
  detalle : Array<Producto>;
  estado: number;

  idCliente: number;
  nombreCliente: string;
  rutCliente: string;
  giroCliente: string;
  direccionCliente: string;
  comunaCliente: string;
  ciudadCliente: string;
  contactoCliente: string;

  idUsuario: number;
  idEmpresa: number;
  /*
  nombreEmpresa : string;
  rutEmpresa : string;
  giroEmpresa : string;
  direccionEmpresa : string;
  comunaEmpresa : string;
  ciudadEmpresa : string;
  contactoEmpresa : string;
  */
}

@Injectable()

export class CotizacionService {

  private url: string = "http://178.128.71.20:3500";
  idUsuario = '';
  idEmpresa = '';
/*
  nombreEmpresa : '';
  rutEmpresa : '';
  giroEmpresa : '';
  direccionEmpresa : '';
  comunaEmpresa : '';
  ciudadEmpresa : '';
  contactoEmpresa : '';
*/
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

  insertarPdf(datosPdf : DatosPdf){
      return this.http.post<DatosPdf>(`${this.url}/api/generarPdf/`,datosPdf, {
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
