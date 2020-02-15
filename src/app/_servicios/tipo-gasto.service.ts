import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';

export interface TipoGasto{
  id:number;
  titulo:string;
  codigo:string;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class TipoGastoService {

  private url: string = "http://178.128.71.20:3500";

  idEmpresa = 0;
  idUsuario = 0;
  constructor(private sService:StorageService,private http: HttpClient) {
    
  }

  async listar() {
    console.log("LISTAR");
    this.idEmpresa = await this.sService.getIdEmpresa();
    this.idUsuario = await this.sService.getIdUsuario();
    console.log("con async ",this.idEmpresa)
    return this.http.get<TipoGasto[]>(`${this.url}/api/tipoGasto/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(tipoGasto : TipoGasto){

    return this.http.post<TipoGasto>(`${this.url}/api/tipoGasto/`,tipoGasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  actualizar(id:number,tipoGasto : TipoGasto){
    return this.http.put<TipoGasto>(`${this.url}/api/tipoGasto/${id}`, tipoGasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,tipoGasto: TipoGasto){

    if(tipoGasto.estado == 0){
      tipoGasto.estado = 1;
    }else{
    tipoGasto.estado = 0;
    }

    return this.http.put<TipoGasto>(`${this.url}/api/tipoGasto/${id}`, tipoGasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<TipoGasto>(`${this.url}/api/tipoGasto/${id}`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<TipoGasto>(`${this.url}/api/tipoGasto/${id}`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
