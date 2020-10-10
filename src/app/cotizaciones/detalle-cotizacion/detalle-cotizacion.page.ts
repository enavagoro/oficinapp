import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
import { ProductoService } from '../../_servicios/producto.service';
import { LoginService } from '../../_servicios/login.service';
import { StockService } from '../../_servicios/stock.service';
import { SucursalService } from '../../_servicios/sucursales.service';

interface Producto{
  id:number;
  titulo:string;
  precio:number;
  codigo:string;
}

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.page.html',
  styleUrls: ['./detalle-cotizacion.page.scss'],
})
export class DetalleCotizacionPage implements OnInit {
    textoSugerido = "";
    max = 0;
    private producto = undefined;
    private detalle = [];
    cantidad : Number = undefined;
    flag = false;
    index : number = 99;
    productos : Producto[] = [];
    productosIventariables = [];
    productosNoIventariables = [];
    banderaProductos = true;
    banderaVer = false;
    banderaInventario = false; //esta bandera o lo que sea deberia activarse a la hora de pagar
    sucursales = [];
    sucursalId = {};

    constructor(private login : LoginService, private navParams : NavParams, private stockService : StockService ,private productoService: ProductoService,private modalCtrl : ModalController,private sucursalService : SucursalService) {
        var ps = navParams.get("detalle");
        var bd = navParams.get("bandera");
        //console.log(ps);
        if(ps){
          this.detalle = ps;
        }

        if(bd){
          this.banderaVer = bd;
        }
    }

    ngOnInit() {
      this.traerDatos();
    }

    traerDatos(){
      this.productoService.listar().then(servicio=>{
        servicio.subscribe(p=>{
            var ps = p.filter(this.filtros);;
            for(var producto of ps){
              this.productos.push(producto);
              this.productosNoIventariables.push(producto);
            }
        })
      })

      this.sucursalService.listar().subscribe(s=>{
        this.sucursales = s;
        console.log(this.sucursales);
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
      this.textoSugerido = "";
      this['cantidad'] = undefined;
    }
    seleccionaSucursal(s){
      this.stockService.listarPorSucursal(s).then(servicio=>{
        servicio.subscribe(p=>{
          console.log('entré',p);
          var ps = p.filter(this.filtros);
            this.productosIventariables=ps;
            this.productos=ps;
        })
      })
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
          }
          else{
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
      //console.log(index);
      var nuevo = [];
      for(let i = 0 ; i< this.detalle.length;i++){
        if(i != index){
          nuevo.push(this.detalle[i]);
        }
      }
      //console.log(nuevo);
      this.detalle = nuevo;
    }

    guardar(){
      this.modalCtrl.dismiss(this.detalle);
    }

    cerrarModal(){
      this.modalCtrl.dismiss();
    }
  }
