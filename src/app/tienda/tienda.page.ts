import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { PlanesPage } from './planes/planes.page';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  banderaBarra = false;
  carrito = [];
  detalle = [];
  servicios = [{titulo:'Fisalis',precio:1,codigo:'F-0'},
               {titulo:'Lirio',precio:1,codigo:'L-1'},
              ];

  constructor(public actionSheetController: ActionSheetController,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  confirmarPago(){
    if(this.carrito.length==0){
      this.alertaCarrito();
    }
    else{
      this.detalle = this.carrito;
      this.abrirPago();
    }
  }

  async abrirPago() {

    const modal = await this.modalCtrl.create({
      component: PlanesPage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle
      }
    });

    modal.onDidDismiss().then(modal=>{
      this.detalle = [];
    });

    return await modal.present();
  }

  activarCarrito(){
    this.banderaBarra = !this.banderaBarra;
  }

    addToCart(posicion){
      var servicio = this.servicios[posicion];
      if(this.carrito.length==0){
        this.carrito.push(servicio);
        console.log('carrito',this.carrito);
      }
      else{
        if(this.validarExistencia(servicio)==true){
          this.carrito.push(servicio);
          console.log('carrito',this.carrito);
        }
      }
    }

    validarExistencia(servicio){
      if(this.carrito.includes(servicio)){
        this.presentAlert();
        return false;
      }
      else{
        return true;
      }
    }

    calcularTotal(){
      var valor = Number(null);
      if(this.carrito.length == 0){
        return valor;
      }
      else{
        for(let elemento of this.carrito){
          valor += elemento.precio;
        }
        return valor;
      }
    }

    quitarServicio(indice){
      this.carrito.splice(indice,1);
    }

    async presentAlert(){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        subHeader: 'Error al agregar',
        message: 'El servicio que deseas agregar al carrito ya ha sido agregado',
        buttons: ['OK']
      });

      await alert.present();
    }

    async alertaCarrito(){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        subHeader: 'Error al generar Subscripción',
        message: 'Debes agregar servicios al carrito para generar una Subscripción',
        buttons: ['OK']
      });

      await alert.present();
    }
}
