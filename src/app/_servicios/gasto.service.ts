import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoGastoService, TipoGasto } from '../_servicios/tipo-gasto.service';

import { StorageService } from './storage.service';

export interface Gasto {
  id: number;
  titulo: string;
  tipo: number;
  descripcion: string;
  monto: number;
  fecha: Date;
  documento: number;
  estado: number;
  img : string;
  idEmpresa: number;
  idUsuario: number;
  tipoDocumento: number;
}

@Injectable()

export class GastoService {

  private url: string = "http://178.128.71.20:3500";

  idEmpresa = 0;
  idUsuario = 0;
  constructor(private sService:StorageService,private http: HttpClient) {

  }
  guardar(form){
    console.log(form);
    form.append('idEmpresa',this.idEmpresa);
    this.http.post("http://178.128.71.20:3500/api/archivos", form, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
            console.log(event);
        });
  }
  async listar() {
    this.idEmpresa = await this.sService.getIdEmpresa();
    this.idUsuario = await this.sService.getIdUsuario();
    return this.http.get<Gasto[]>(`${this.url}/api/gastos/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertar(gasto : Gasto){
    return this.http.post<Gasto>(`${this.url}/api/gastos/`,gasto, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
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
