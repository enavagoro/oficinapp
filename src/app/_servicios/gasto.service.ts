import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoGastoService, TipoGasto } from '../_servicios/tipo-gasto.service';

export interface Gasto {
  id: number;
  titulo: string;
  tipo: number;
  descripcion: string;
  monto: number;
  fecha: Date;
  documento: number;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
}

@Injectable()

export class GastoService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    var idEmpresa = sessionStorage.getItem("idEmpresa");
    return this.http.get<Gasto[]>(`${this.url}/api/gastos/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',idEmpresa)
    });
  }

  insertar(gasto : Gasto){
    gasto.idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
    gasto.idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    return this.http.post<Gasto>(`${this.url}/api/gastos/`,gasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:number,gasto : Gasto){
    return this.http.put<Gasto>(`${this.url}/api/gastos/${id}`, gasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,gasto: Gasto){

    if(gasto.estado == 0){
      gasto.estado = 1;
    }else{
    gasto.estado = 0;
    }

    return this.http.put<Gasto>(`${this.url}/api/gastos/${id}`, gasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Gasto>(`${this.url}/api/gastos/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Gasto>(`${this.url}/api/gastos/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
