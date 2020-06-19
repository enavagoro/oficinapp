import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { PlanesPage } from './planes/planes.page';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  async abrirPlanes() {

    const modal = await this.modalCtrl.create({
      component: PlanesPage,
      cssClass: 'modals',
      componentProps:{
        /*
        'detalle' : this.detalle
        */
      }
    });

    modal.onDidDismiss().then(modal=>{
    });

    return await modal.present();
  }

}
