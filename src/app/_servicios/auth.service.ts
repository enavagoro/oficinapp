import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

interface auth {
  accessToken : string;
  refreshToken : string;
  userId : string;
}

@Injectable()

export class AuthService {

  private url: string = "http://201.239.13.125";

  constructor(private http: HttpClient, private login : LoginService) { }

  async logUser(usuario){
    this.url = <string>await this.login.getUrl();
    this.url = "http://"+this.url;
    return this.http.post<auth>(`${this.url}/auth/` , usuario , {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
