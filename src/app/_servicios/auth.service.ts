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

  private url: string = "https://orca-app-3c9vq.ondigitalocean.app";

  constructor(private http: HttpClient, private login : LoginService) { }

  async logUser(usuario){
    
    this.url = "https://orca-app-3c9vq.ondigitalocean.app";
    return this.http.post<auth>(`${this.url}/auth/` , usuario , {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
