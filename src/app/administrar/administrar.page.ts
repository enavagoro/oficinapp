import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

interface Cliente {
  id: number;
  nombre: string;
  rut: string;
  giro: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  contacto: string;
  tipoCompra: number;
}

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})

export class AdministrarPage implements OnInit {
  menus = [];
  filterPAth = "administrar/";
  constructor(private storage : Storage) {

    this.storage.get('usuarios').then((val) => {
       if(val){
         var menu = val.menu;
         this.menus = menu.filter( m => { return m.url.includes(this.filterPAth) })
       }
    })
  }

  ngOnInit() {
  }

}
