import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token : string = "";
  private url: string = "http://201.239.13.125";
  private empresa : string = "";
  constructor(private storage : Storage,private http:HttpClient) { }
  public getEmpresa(){
    return this.empresa;
  }
  public getFirstTimeEmpresa(){
    this.storage.get('usuarios').then((val) => {
      return val.empresa;
    })
  }
  public setEmpresa(em){
    this.empresa = em;
  }
  public setToken(t){
    this.token = t;
  }
  public getToken(){
    return "Bearer "+this.token;
  }
  public setUser(user){
    this.storage.set('usuarios', user);
  }
  public getUser(form){
    return this.http.post<any[]>(`${this.url}/users/login/`,form , {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.token)
      .set('Content-Type', 'application/json')

    });
  }
}
