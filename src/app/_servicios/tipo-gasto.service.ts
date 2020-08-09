import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {
  private url: string = "http://201.239.13.125";
  constructor(private login:LoginService,private http:HttpClient) {
  }
  async listar() {
    
    this.url = "https://api.vase.cl";
    return this.http.get<any[]>(`${this.url}/tipoGasto/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  gettipoGasto(id){
    return this.http.get<any[]>(`${this.url}/tipoGasto/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  insertar(prod){
    return this.http.post<any[]>(`${this.url}/tipoGasto/`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(prod,id){
    return this.http.patch<any[]>(`${this.url}/tipoGasto/${id}`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  eliminar(prod,id){
      prod.estado = !prod.estado;
      delete prod.__v;
      return this.http.patch<any[]>(`${this.url}/tipoGasto/${id}`,prod , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization' , this.login.getToken())
        .set('empresaId' , this.login.getEmpresa())
      });
  }
    //var indice  = this.tipoGastos.indexOf(prod);
    //this.tipoGastos[indice] = prod;
    //console.log(this.tipoGastos[indice]);


}
