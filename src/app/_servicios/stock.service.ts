import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url: string = "http://201.239.13.125";
  constructor(private login:LoginService,private http:HttpClient) {
  }
  async listar() {
    this.url = <string>await this.login.getUrl();
    this.url = "http://"+this.url;
    return this.http.get<any[]>(`${this.url}/stock/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  async listarPorSucursal(id){
    this.url = <string>await this.login.getUrl();
    this.url = "http://"+this.url;
    return this.http.get<any[]>(`${this.url}/stock/sucursal/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  getProducto(id){
    return this.http.get<any[]>(`${this.url}/stock/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  insertar(prod){
    return this.http.post<any[]>(`${this.url}/stock/`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(prod,id){
    return this.http.patch<any[]>(`${this.url}/stock/${id}`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  descontar(cantidad,id){
    let peticion = {cantidad :cantidad};
    return this.http.patch<any[]>(`${this.url}/stock/restar/${id}`,peticion , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  eliminar(prod,id){
      prod.estado = false;
      delete prod.__v;
      return this.http.patch<any[]>(`${this.url}/stock/${id}`,prod , {
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
