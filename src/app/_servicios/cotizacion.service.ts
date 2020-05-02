import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductoService, Producto } from '../_servicios/producto.service';
import { StorageService } from './storage.service';

export interface Cotizacion {
  id: number;
  idCliente: number;
  fechaEmision: string;
  fechaCaducidad: string;
  detalle : Array<Producto>;
  estado: number;
  idEmpresa: number;
  idUsuario: number;
  nota: string;
}

export interface DatosPdf{
  id: number;
  fechaEmision: string;
  fechaCaducidad: string;
  detalle : Array<Producto>;
  estado: number;

  idCliente: number;
  nombreCliente: string;
  rutCliente: string;
  giroCliente: string;
  direccionCliente: string;
  comunaCliente: string;
  ciudadCliente: string;
  contactoCliente: string;

  idUsuario: number;
  idEmpresa: number;
  /*
  nombreEmpresa : string;
  rutEmpresa : string;
  giroEmpresa : string;
  direccionEmpresa : string;
  comunaEmpresa : string;
  ciudadEmpresa : string;
  contactoEmpresa : string;
  */
}

@Injectable()

export class CotizacionService {

  private url: string = "http://178.128.71.20:3500";
  private urlFile : string = "http://178.128.71.20:3950";
  idUsuario = '';
  idEmpresa = '';
/*
  nombreEmpresa : '';
  rutEmpresa : '';
  giroEmpresa : '';
  direccionEmpresa : '';
  comunaEmpresa : '';
  ciudadEmpresa : '';
  contactoEmpresa : '';
*/
  constructor(private sService:StorageService,private http: HttpClient) {

   }

  async listar() {
    this.idEmpresa = (await this.sService.getIdEmpresa()).toString();
    this.idUsuario = (await this.sService.getIdUsuario()).toString();

    return this.http.get<Cotizacion[]>(`${this.url}/api/cotizaciones/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idEmpresa',""+this.idEmpresa)
    });
  }

  insertarPdf(datosPdf : DatosPdf){
      return this.http.post<DatosPdf>(`${this.urlFile}/cotizacion/`,datosPdf, {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      });
    }

  insertar(cotizacion : Cotizacion){
    return this.http.post<Cotizacion>(`${this.url}/api/cotizaciones/`,cotizacion, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:number,cotizacion : Cotizacion){
    return this.http.put<Cotizacion>(`${this.url}/api/cotizaciones/${id}`, cotizacion,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  borrar(id:number,cotizacion: Cotizacion){

    if(cotizacion.estado == 0){
      cotizacion.estado = 1;
    }else{
    cotizacion.estado = 0;
    }

    return this.http.put<Cotizacion>(`${this.url}/api/cotizaciones/${id}`, cotizacion,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  gathering(id:string){
    return this.http.get<Cotizacion>(`${this.url}/api/cotizaciones/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  listarById(id:string){
    return this.http.get<Cotizacion>(`${this.url}/api/cotizaciones/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}


/*
let data = {id_cliente: req.body.id_cliente, fecha: req.body.fecha,estado:1,idEmpresa : req.headers.idempresa,usuario:req.body.idUsuario};
    let sql = "INSERT INTO ventas SET ?";
    let detalles = req.body.detalle;
    console.log(detalles)
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      if(results.insertId>0 && detalles){
        for(let i = 0 ; i < req.body.detaller.length;i++){
          var detalle = detalles[i];
          sql = "insert into detalle_cotizacion set ?";
          data = {id_cotizacion:results.insertId,id_producto:detalle.id_producto,titulo:detalle.titulo,precio:detalle.precio,cantidad:detalle.cantidad};
          conn.query(sql, data,(err, results) => {
            if(err) throw err;
          })
        }
      }
      res.send(JSON.stringify(results));
    });
  });
  id_cotizacion:results.insertId,id_producto:detalle.id_producto,titulo:detalle.titulo,precio:detalle.precio,cantidad:detalle.cantidad
  create table detalle_cotizacion ( id int primary key auto_increment , id_cotizacion int, id_producto int , titulo varchar(255), precio int , cantidad int)
for(var producto of req.body.detalle){
      //insert productos of detalle
        let insert  = 'insert into cotizaciones_detalle set ?';
        let prod = conn.query(insert, producto,(err, results) => {
                if(err) throw err;
        });
    }

*/
