import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
})
export class PlanesPage implements OnInit {
  detalle = [];
  totalSubscripcion = Number(null);
  totalFinal = Number(null);

  banderaSeccion = 1;
  valorPeriodo = 1;

  constructor(private navParams : NavParams, private modalCtrl : ModalController) {
    /*
    var ps = navParams.get("detalle");

    if(ps){
      this.detalle = ps;
    }
    */
   }

  ngOnInit() {
    this.calcularSubscripcion();
  }

  AvanzarSeccion(){
    this.banderaSeccion ++;
  }

  RetrocederSeccion(){
    this.banderaSeccion --;
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  calcularSubscripcion(){
    var valor = Number(null);
    for(let elemento of this.detalle){
      valor += elemento.precio;
    }

    this.totalSubscripcion = valor;
    console.log('totalSubscripcion',this.totalSubscripcion);
  }
}
