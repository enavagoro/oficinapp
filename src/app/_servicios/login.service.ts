import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token : string = "";
  private url: string = "https://orca-app-3c9vq.ondigitalocean.app";
  private empresa : string = "";
  constructor(private router:Router,private storage : Storage,private http:HttpClient) {
    this.storage.get('usuarios').then((val) => {
      if(val){
        this.setEmpresa(val['empresa']);
        this.setToken(val['token']);
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
  }
  public getUrl(){
    return new Promise(resolve => {
      resolve("https://orca-app-3c9vq.ondigitalocean.app");
    });
  }
  public getEmpresa(){
    return this.empresa;
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
  async getUser(form){
    this.url = <string>await this.getUrl();
    this.url = "https://orca-app-3c9vq.ondigitalocean.app";
    return this.http.post<any[]>(`${this.url}/users/login/`,form , {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.token)
      .set('Content-Type', 'application/json')

    });
  }
}
