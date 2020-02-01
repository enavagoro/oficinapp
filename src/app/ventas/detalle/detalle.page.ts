import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {

  private producto : Producto[] = [];
  flag = false;
  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  insertar(){
  this.flag = true;
  }
  add(){
    this.producto.push({})
  }
  borrar(index){
    console.log(index);
    var nuevo = [];
    for(let i = 0 ; i< this.producto.length;i++){
      if(i != index){
        nuevo.push(this.producto[i]);
      }
    }
    console.log(nuevo);
    this.producto = nuevo;
  }

  guardar(){
    this.modalCtrl.dismiss(this.producto);
  }

}
