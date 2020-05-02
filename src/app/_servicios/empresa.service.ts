import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Empresa{
  id : number;
  nombre : string;
  rut : string;
  giro : string;
  direccion : string;
  comuna : string;
  ciudad : string;
  contacto : string;
  estado : number;
  url : string;
}

@Injectable()

export class EmpresaService {

  private url: string = "http://178.128.71.20:3500";
  idEmpresa = '';
  constructor(private sService:StorageService,private http: HttpClient) {

  }

  guardar(form){
    //console.log(form);
    form.append('idEmpresa',this.idEmpresa);
    this.http.post("http://178.128.71.20:3500/api/archivos", form, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
            //console.log(event);
        });
  }

  async listarById(){
    this.idEmpresa = (await this.sService.getIdEmpresa()).toString();
    return this.http.get<Empresa>(`${this.url}/api/empresas/${this.idEmpresa}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  async listar() {
    this.idEmpresa = (await this.sService.getIdEmpresa()).toString();
    return this.http.get<Empresa[]>(`${this.url}/api/empresas/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }
  login(empresa,clave){
    let cliente = {empresa:empresa,clave:clave};
    return this.http.post<Empresa>(`${this.url}/api/login/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  insertar(cliente : Empresa){
    return this.http.post<Empresa>(`${this.url}/api/empresas/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:number,cliente : Empresa){
    return this.http.put<Empresa>(`${this.url}/api/empresas/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,cliente : Empresa){

    if(cliente.estado == 0){
      cliente.estado = 1;
    }else{
      cliente.estado = 0;
    }

    return this.http.put<Empresa>(`${this.url}/api/empresas/${id}`, cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Empresa>(`${this.url}/api/empresas/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
