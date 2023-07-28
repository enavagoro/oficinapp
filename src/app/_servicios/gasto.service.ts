import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private url: string = "https://orca-app-3c9vq.ondigitalocean.app";
  constructor(private login:LoginService,private http:HttpClient) {
  }
  async listar() {
    return this.http.get<any[]>(`${this.url}/gasto/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  traerIp(){
    return this.url;
  }
  async reporte(fi,ff){
    var fechas = {fechaInicio:fi,fechaFin:ff};
    return this.http.post<any[]>(`${this.url}/gasto/reporte/fecha/` , fechas ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  async listarPorSucursal(id){
    return this.http.get<any[]>(`${this.url}/gasto/sucursal/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  guardar(form){
    //console.log(form);
    form.append('idEmpresa',this.login.getEmpresa());
    this.http.post(this.url+"/subidas", form, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
            //console.log(event);
        });
  }
  getProducto(id){
    return this.http.get<any[]>(`${this.url}/gasto/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  insertar(prod){
    return this.http.post<any[]>(`${this.url}/gasto/`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(id,prod){
    return this.http.patch<any[]>(`${this.url}/gasto/${id}`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  descontar(cantidad,id){
    let peticion = {cantidad :cantidad};
    return this.http.patch<any[]>(`${this.url}/gasto/restar/${id}`,peticion , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  eliminar(prod,id){
      prod.estado = !prod.estado;
      delete prod.__v;
      return this.http.patch<any[]>(`${this.url}/gasto/${id}`,prod , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization' , this.login.getToken())
        .set('empresaId' , this.login.getEmpresa())
      });
  }
    //var indice  = this.productos.indexOf(prod);
    //this.productos[indice] = prod;
    //console.log(this.productos[indice]);


}
