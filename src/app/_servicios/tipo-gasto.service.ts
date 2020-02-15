import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

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
  constructor(private http: HttpClient,private storage : Storage) {
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value;
    });
    this.storage.get('idEmpresa').then((value)=>{
      this.idEmpresa = value;
    });
  }

  listar() {
    return this.http.get<TipoGasto[]>(`${this.url}/api/tipoGasto/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(tipoGasto : TipoGasto){
    tipoGasto.idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
    tipoGasto.idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    return this.http.post<TipoGasto>(`${this.url}/api/tipoGasto/`,tipoGasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
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
