import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
import { ProductoService } from '../../_servicios/producto.service';
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

  private producto = undefined;
  private detalle = [];
  cantidad : Number = undefined;
  flag = false;
  productos : Producto[] = [];
  constructor(private navParams : NavParams,private productoService: ProductoService,private modalCtrl : ModalController) {
      var ps = navParams.get("detalle");
      console.log(ps);
      if(ps){
        this.detalle = ps;
      }

  }

  ngOnInit() {
    this.productoService.listar().subscribe(ps=>{
      this.productos = ps;
    })
  }

  insertar(){
  this.flag = true;
  }

  add(){
    let prod = this.productos[this.producto];
    let d = {id_producto : prod.id, titulo : prod.titulo,precio : prod.precio, cantidad : this.cantidad }
    this.detalle.push(d);
    this.cantidad = undefined;
    this.producto = undefined;
    console.log(this.detalle);
  }

  borrar(index){
    console.log(index);
    var nuevo = [];
    for(let i = 0 ; i< this.productos.length;i++){
      if(i != index){
        nuevo.push(this.productos[i]);
      }
    }
    console.log(nuevo);
    this.productos = nuevo;
  }

  guardar(){
    this.modalCtrl.dismiss(this.detalle);
  }

}
