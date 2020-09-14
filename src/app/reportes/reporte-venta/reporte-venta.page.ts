import { Component, OnInit, ViewChild } from '@angular/core';
import { VentaService } from '../../_servicios/venta.service';
import { ClienteService } from '../../_servicios/cliente.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  fill: any;
  plotOptions: any;
  colors: string[];
};

export type RadioOptions ={
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}


@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.page.html',
  styleUrls: ['./reporte-venta.page.scss'],
})

export class ReporteVentaPage implements OnInit {
  public chartGrafico1 : Partial<ChartOptions>;
  public options1 : Partial<ChartOptions>;
  public options2 : Partial<ChartOptions>;
  public options3 : Partial<ChartOptions>;
  public options4: Partial<ChartOptions>;
  public options5 : Partial<ChartOptions>;
  public options6 : Partial<ChartOptions>;
  public options7 : Partial<RadioOptions>;

  arreglo = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  nombreGrafico1 = "Gastos";
  dataGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  categoriasGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];

  ventas = [];

  ventasSemanales = {"valor":Number(null),"cantidad":Number(null),"dias":[Number(null),Number(null),Number(null),Number(null),Number(null),Number(null)]};

  ventasMensuales = {"valor":Number(null),"cantidad":Number(null),"meses":[{"Enero":Number(null)},
                                                                                {"Febrero":Number(null)},
                                                                                {"Marzo":Number(null)},
                                                                                {"Abril":Number(null)},
                                                                                {"Mayo":Number(null)},
                                                                                {"Junio":Number(null)},
                                                                                {"Julio":Number(null)},
                                                                                {"Agosto":Number(null)},
                                                                                {"Septiembre":Number(null)},
                                                                                {"Octubre":Number(null)},
                                                                                {"Noviembre":Number(null)},
                                                                                {"Diciembre":Number(null)}
                                                                               ]};

  ventasAnuales = {"valor":Number(null),"cantidad":Number(null),"meses":[Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null)]};

  ventasTotales = {"valor":Number(null),"cantidad":Number(null)};

  productosVendidos = {"nombres":['','','','','','','','','',''],"cantidades":[Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null),Number(null)]};
  productosDetalle = [];

  clientes = [];
  clientesVentas = {"nombres":[],"cantidades":[]};
  clientesDetalle = [];

  metodoUtilizado = {"nombres":['Efectivo','Debito','Credito'],"frecuencia":[]};


  constructor(public ventaService: VentaService,public clienteService: ClienteService) {
    this.options5 = {
      series: [{
      name: 'Producto',
      data: this.productosVendidos.cantidades
    }],
      chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#2196f3', '#9c27b0', '#e91e63','#8bc34a','#ffeb3b','#ffc107','#ff9800'],
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"]
      },
      formatter: function(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    xaxis: {
      categories: this.productosVendidos.nombres
    }
    };
  }

  ngOnInit() {
    console.log('ventas semanales',this.ventasSemanales);
    let fecha = new Date();
    console.log('la fecha tal cual',fecha);
    console.log('esta fecha pero el día',fecha.getDay());
    let fechaAnterior = fecha.getDay();
    console.log('esta fecha pero 6 días antes', new Date(fechaAnterior));

    this.clienteService.listar().then(servicio=>{
      servicio.subscribe(c=>{
          this.clientes = c.filter(this.filtros);
          console.log('clientes',this.clientes);
        })
    })

    this.ventaService.listar().then(servicio=>{
      servicio.subscribe(v=>{
          this.ventas = v.filter(this.filtros);

          for(var venta of this.ventas){

            let fechaTemporal = new Date(venta.fecha);

            console.log('fecha temporal',fechaTemporal.getMonth());
            console.log('fecha',fecha.getMonth());
            if(fechaTemporal.getMonth()==fecha.getMonth() && fechaTemporal.getFullYear()==fecha.getFullYear()){
              this.calculoValorVenta(venta,'mes');
            }
            if(fechaTemporal.getFullYear()==fecha.getFullYear()){
              this.calculoValorVenta(venta,'año');
            }

          }
          this.calculoClientesVenta();
          this.calcularMetodoPago();
          this.productoMasVendido();
        })

    })

    this.options1 = {
      series: [{
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
      chart: {
      type: 'line',
      height: 35,
      sparkline: {
        enabled: true
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
    };

    this.options2 = {
      series: [{
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
      chart: {
      type: 'line',
      height: 35,
      sparkline: {
        enabled: true
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
    };

    this.options3 = {
      series: [{
      data: this.ventasAnuales.meses
    }],
      chart: {
      type: 'area',
      height: 50,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
    };

    this.options4 = {
      chart: {
        type: "area",
        height: 250
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: "Ventas del Mes ($)",
          data: this.ventasAnuales.meses
        }
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      }
    };

    this.options6 = {
      series: [{
      name: 'Cantidad de veces vendidas ',
      data: this.clientesVentas.cantidades,
    }],
      chart: {
      height: 300,
      type: 'radar',
    },
    xaxis: {
      categories: this.clientesVentas.nombres
    },
    plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"]
            }
          }
        }
      },
    };

    this.options7 = {
      series: this.metodoUtilizado.frecuencia,
      chart: {
        type: "pie",
        height: 220
      },
      labels: this.metodoUtilizado.nombres,
    };

  }

  calculoValorVenta(venta,tipo){
    let fechaTemporal = new Date(venta.fecha);

    let valorVenta = Number(null);

    for(var p of venta.detalle){
      valorVenta = p.cantidad * p.precio;
      if(tipo=='mes'){
        this.ventasMensuales.valor += p.precio * p.cantidad;
      }
      if(tipo=='año'){
        this.ventasAnuales.valor += p.precio * p.cantidad;
        this.ventasAnuales.meses[fechaTemporal.getMonth()]+=valorVenta;
        this.productosDetalle.push(p);
      }
    }

  }

    productoMasVendido(){
      var productosAgrupados = [];

      this.productosDetalle.map(producto=>{

        var indice = -1;
        for(var i = 0 ; i < productosAgrupados.length ; i++){
            if(producto.id == productosAgrupados[i].id){
              indice = i;
            }
        }
        if(indice === -1){
          productosAgrupados.push(producto);
        }else{
          productosAgrupados[indice].cantidad += producto.cantidad;
        }
        //consultar al cristopher para ver como agrupar las cantidades
      })

      console.log('productos agrupados',productosAgrupados);
      productosAgrupados.sort(function (a,b) {
        if(a.cantidad < b.cantidad){
          return 1;
        }
        if(a.cantidad > b.cantidad){
          return -1;
        }
        return 0;
      })

      for(let i=0; i< this.productosVendidos.nombres.length; i++){
        this.productosVendidos.nombres[i] = productosAgrupados[i].titulo;
        this.productosVendidos.cantidades[i]= productosAgrupados[i].cantidad;
      }

    }

    calculoClientesVenta(){
      var clientesAgrupados = [];
      this.ventas.map(venta=>{
        venta['cantidadCliente']=1;
        var indice = -1;
        for(var i = 0 ; i < clientesAgrupados.length ; i++){
            if(venta.idCliente == clientesAgrupados[i].idCliente){
              indice = i;
              clientesAgrupados[i].cantidadCliente++;
            }
        }
        if(indice === -1){
          clientesAgrupados.push(venta);
        }else{
          //productosAgrupados[indice].cantidad += producto.cantidad;
        }
      })
      console.log('clientes agrupados',clientesAgrupados);

      clientesAgrupados.sort(function (a,b) {

        if(a.cantidadCliente < b.cantidadCliente){
          return 1;
        }
        if(a.cantidadCliente > b.cantidadCliente){
          return -1;
        }
        return 0;
      })

      clientesAgrupados.map(venta=>{
        for(let i=0; i<this.clientes.length; i++){
          if(venta.idCliente==this.clientes[i].id){
            this.clientesVentas.nombres.push(this.clientes[i].nombre);
            this.clientesVentas.cantidades.push(venta.cantidadCliente);
          }
        }
      })

    }

    calcularMetodoPago(){
      console.log('entre');
      var metodosAgrupados = [];

      this.ventas.map(venta=>{
        console.log('esta es la venta',venta);
        venta['cantidadMetodo']=1;
        var indice = -1;
        for(var i = 0 ; i < metodosAgrupados.length ; i++){
            if(venta.metodo == metodosAgrupados[i].metodo){
              indice = i;
              metodosAgrupados[i].cantidadMetodo++;
            }
        }
        if(indice === -1){
          metodosAgrupados.push(venta);
        }
      })

      metodosAgrupados.sort(function (a,b) {
        if(a.metodo > b.metodo){
          return 1;
        }
        if(a.metodo < b.metodo){
          return -1;
        }
        return 0;
      })

      for(let x=0;x<metodosAgrupados.length;x++){
        this.metodoUtilizado.frecuencia[x]=metodosAgrupados[x].cantidadMetodo
      }
    }

    filtros(venta){
    if(venta.estado == 1){
      return true;
    }
    return false;
  }
}
