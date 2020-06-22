import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import * as io from 'socket.io-client';
// @ts-ignore
import Push from 'push.js';

@Injectable()

export class NotificationService {

  private socket;

  constructor(private http: HttpClient, private login : LoginService ) {
  }
  async setSocket(){
    var url = <string>await this.login.getUrl();
    url = "https://"+url;
    console.log(url);

    if(this.socket){
      this.socket.destroy();
    }
    this.socket = io(
        url+":4000"
      , { query:"idUsuario=general" ,transports: ['websocket']}
    );
  }
  mostrarNotificacion(mensaje){
    Push.Permission.request(function (ok) {
      console.log(ok);
      var promise = Push.create(mensaje);
    }, function (fallo) {
      console.log(fallo)
    });
  }
  onGranted(){

  }

  public sendNotification(notif){
    this.socket.emit('jazmin',notif);
  }

  public getNotif = () => {
    var self = this;
    return Observable.create((observer) => {
      this.socket.on('jazmin', (message) => {
        console.log(message);

        this.mostrarNotificacion(message);
      });
    })
  }

}
