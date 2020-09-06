import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
import { ProductoService } from '../../_servicios/producto.service';
import { StockService } from '../../_servicios/stock.service';

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
  textoSugerido = "";
  max = 0;
  private producto = undefined;
  private detalle = [];
  cantidad : Number = undefined;
  flag = false;
  valorActual : number ;
  editarValor : boolean = false;
  index : number = 99;
  productos : Producto[] = [];
  productosIventariables = [];
  productosNoIventariables = [];
  banderaProductos = true;

  constructor(private navParams : NavParams, private stockService : StockService ,private productoService: ProductoService,private modalCtrl : ModalController) {
      var ps = navParams.get("detalle");
      console.log(ps);
      
      if(ps){
        this.detalle = ps;
      }

  }

  ngOnInit() {
    this.traerDatos();
  }

  traerDatos(){
    this.productoService.listar().then(servicio=>{
      servicio.subscribe(p=>{
          var ps = p.filter(this.filtros);

          for(var producto of ps){
            console.log(producto);
            this.productos.push(producto);
            this.productosNoIventariables.push(producto);
          }
      })
    })

    this.stockService.listar().then(servicio=>{
      servicio.subscribe(p=>{
        var ps = p.filter(this.filtros);;
        for(var producto of ps){
          this.productos.push(producto);
          this.productosIventariables.push(producto);
        }
      })
    })
  }
  filtros(gasto){
    if(gasto.estado){
      return true;
    }
    return false;
  }
  insertar(){
  this.flag = true;
  }

  limpiar(){
    this.producto = undefined;
  }
  seleccionaProducto(){
      var prod = this.productos[this.producto];
      console.log(prod);
      if(prod && prod['cantidad']){
        this.textoSugerido = "Quedan "+prod['cantidad']+" unidades";
        this.max = prod['cantidad'];
      }else{
        if(prod['cantidad'] === 0){
          this.textoSugerido = "No quedan unidades";
          this.max = 0;
        }else{
          this.textoSugerido = "No inventariado";
          this.max = 999999999;
        }
      }
  }
  add(){
    let prod = this.productos[this.producto];
    var tipo = 0; // no inventariado
    if(prod['venta']){
      tipo = 1;
    }
    var precio = prod.precio|| prod['venta'];
    let d = {id : prod.id, titulo : prod.titulo,precio : precio, cantidad : this['cantidad'], tipo : tipo }
    this.detalle.push(d);
    this.productos[this.producto]['cantidad']  =  parseInt(this.productos[this.producto]['cantidad']) - parseInt(""+this['cantidad']);
    this.max = this.productos[this.producto]['cantidad'];
    this['cantidad'] = undefined;
    this.producto = undefined;
    //console.log(this.detalle);
  }

  borrar(index){
    var nuevo = [];
    for(let i = 0 ; i< this.detalle.length;i++){
      if(i != index){
        nuevo.push(this.detalle[i]);
      }
    }
    this.detalle = nuevo;
  }
  editar(index){
    this.index = index;
    this.editarValor = true;
  }
  confirmar(index){
    this.index = 999;
    this.editarValor = false;
    let prod = this.detalle[index];

    if(prod.precio){
      prod.precio = this.valorActual;
    }else{
      prod['venta'] = this.valorActual;
    }
    console.log(this.detalle[index]);
  }
  guardar(){
    this.modalCtrl.dismiss(this.detalle);
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
