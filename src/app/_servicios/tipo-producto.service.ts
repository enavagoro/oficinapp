import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface TipoProducto{
  id:number;
  titulo:string;
  codigo:string;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class TipoProductoService {

  private url: string = "http://jazmin.reset.cl";

  idEmpresa = '';
  idUsuario = '';
  constructor(private sService:StorageService,private http: HttpClient) {

  }

  async listar() {
    this.idEmpresa = (await this.sService.getIdEmpresa()).toString();
    this.idUsuario = (await this.sService.getIdUsuario()).toString();
    return this.http.get<TipoProducto[]>(`${this.url}/api/tipoProducto/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(tipoProducto : TipoProducto){
    tipoProducto.idUsuario = parseInt(this.idUsuario);
    return this.http.post<TipoProducto>(`${this.url}/api/tipoProducto/`,tipoProducto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  actualizar(id:number,tipoProducto : TipoProducto){
    return this.http.put<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, tipoProducto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,tipoProducto: TipoProducto){

    if(tipoProducto.estado == 0){
      tipoProducto.estado = 1;
    }else{
    tipoProducto.estado = 0;
    }

    return this.http.put<TipoProducto>(`${this.url}/api/tipoProducto/${id}`, tipoProducto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
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
