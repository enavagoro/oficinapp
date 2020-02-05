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
}

@Injectable()

export class GastoService {

  private url: string = "http://178.128.71.20:3500";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Gasto[]>(`${this.url}/api/gastos/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  insertar(gasto : Gasto){
    return this.http.post<Gasto>(`${this.url}/api/gastos/`,gasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,gasto : Gasto){
    return this.http.patch<Gasto>(`${this.url}/api/gastos/${id}`, gasto,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:string){
    return this.http.delete<Gasto>(`${this.url}/api/gastos/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
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
