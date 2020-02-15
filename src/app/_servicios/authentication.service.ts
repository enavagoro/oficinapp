import { Injectable, Injector } from '@angular/core';
import { Usuario } from './usuario.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;


  constructor(public injector : Injector,public router: Router, private storage: Storage) {
                this.storage.get('usuario').then((value) => {
                  this.currentUserSubject = new BehaviorSubject<Usuario>(value);
                  this.currentUser = this.currentUserSubject.asObservable();
                });
  }

  public get currentUserValue(): Usuario {
      return this.currentUserSubject.value;
  }

  async login(userId: string, password: string) {

    var userService = this.injector.get(UsuarioService);
    var res = await userService.login(userId,password);
    this.storeUserData({id:2, nombre:'admin',apellido:' admin' ,correo:' admin' ,clave:' admin' ,estado : 1 })
    console.log(res);
    const promise = new Promise((resolve, reject ) => {
          res.subscribe(datos=>{
            resolve(datos)
          })
    });
    return promise;    
    /*
    const promise = new Promise((resolve, reject ) => {
      if (this.userList[userId] !== undefined) {
        console.log(this.userList[userId].password, ' : json password');
        console.log(password, ' : password');
        if (this.userList[userId].password === password) {
          const user = new User();
          user.userId = userId;
          user.userName = this.userList[userId].userName;
          user.email = this.userList[userId].email;
          user.mobile = this.userList[userId].mobile;
          this.storeUserData(user);
          resolve({status: 'success', message: 'User credentials are valid'});
        } else {
          reject({status: 'error', message: 'Invalid user credentials'});
        }

      } else {
        reject({status: 'error', message: 'Invalid user'});
      }
    });
    */
  }

  logout() {
      // remove user from local storage to log user out
      this.removeUserData();
      this.router.navigate(['/login']);
  }

  async storeUserData(user: Usuario) {
    const res = await this.storage.set('usuario', user);
    this.currentUserSubject.next(user);
  }

  async getUserData() {
    let userData: Usuario;
    await this.storage.get('usuario').then((value => {
         userData = value;
         console.log('User Data 1:', userData);
    }));
    console.log('User Data 2:', userData);
    return userData;
  }

  async removeUserData() {
    await this.storage.remove('usuario');
    this.currentUserSubject.next(null);
  }
}
