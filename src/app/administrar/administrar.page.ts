import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../_servicios/cliente.service';
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

  constructor() { }

  ngOnInit() {
  }

}
