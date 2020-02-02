import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { ProductoService } from '../../_servicios/producto.service';

interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})

export class ProductoPage implements OnInit {
  productos = [];
  public producto : Producto = {id:0,titulo:'',precio:0,codigo:''};

  constructor(private productoService : ProductoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
    this.productoService.listar().subscribe(productos=>{
      this.productos = productos;
      console.log(productos);
    })
  }

  public guardarProducto(){
    console.log('entra');
    this.producto.id = 0 + (this.productos.length + 1);
    this.productoService.insertar(this.producto).subscribe(producto=>{
      console.log('entra2');
    })
    this.ngOnInit();
    this.producto = {id:0,titulo:'',precio:0,codigo:''};
  }

  async confirmar() {
    console.log(this.producto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN PRODUCTO</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.guardarProducto();
          }
        }
      ]
    });

    await alert.present();
  }
}
