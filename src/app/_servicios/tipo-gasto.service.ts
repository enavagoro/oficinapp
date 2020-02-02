import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface TipoGasto{
  id:number;
  titulo:string;
  codigo:string;
}

@Injectable()

export class TipoGastoService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<TipoGasto[]>(`${this.url}/api/tipoGasto/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  insertar(tipoGasto : TipoGasto){
    return this.http.post<TipoGasto>(`${this.url}/api/tipoGasto/`,tipoGasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,tipoGasto : TipoGasto){
    return this.http.patch<TipoGasto>(`${this.url}/api/tipoGasto/${id}`, tipoGasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:string){
    return this.http.delete<TipoGasto>(`${this.url}/api/tipoGasto/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
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
