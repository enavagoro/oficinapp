

/*
if (req.body.attachments == "si"){
      mailOptions.attachments = { filename: req.body.nombreArchivo,path: req.body.path}
}
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class EmailService {

  private url: string = "https://api.vase.cl";

  constructor(private http: HttpClient) { }

  enviar(email) {
    return this.http.post<any>(`${this.url}/email/`,email,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
