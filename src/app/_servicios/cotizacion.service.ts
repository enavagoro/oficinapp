import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()

export class CotizacionService {

  private url: string = "https://orca-app-3c9vq.ondigitalocean.app";

  constructor(private login:LoginService,private http:HttpClient) {
  }
  async listar() {
    
    this.url = "https://orca-app-3c9vq.ondigitalocean.app";
    return this.http.get<any[]>(`${this.url}/cotizacion/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  insertarPdf(datosPdf ){
      datosPdf.url = this.url +"/"+datosPdf.idEmpresa+"/"+datosPdf.url;
      return this.http.post<any[]>(`${this.url}/preview-cotizacion/`,datosPdf, {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      });
    }
  getcotizacion(id){
    return this.http.get<any[]>(`${this.url}/cotizacion/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  insertar(prod){
    return this.http.post<any[]>(`${this.url}/cotizacion/`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(prod,id){
    return this.http.patch<any[]>(`${this.url}/cotizacion/${id}`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  eliminar(prod,id){
      prod.estado = !prod.estado;
      delete prod.__v;
      return this.http.patch<any[]>(`${this.url}/cotizacion/${id}`,prod , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization' , this.login.getToken())
        .set('empresaId' , this.login.getEmpresa())
      });
  }
}
