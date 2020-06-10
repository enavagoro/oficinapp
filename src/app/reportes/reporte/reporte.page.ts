import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';

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
  ApexLegend
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
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  public chartGrafico1 : Partial<ChartOptions>;
  public chartGrafico2 : Partial<ChartOptions>;

  public chartHeat1 : Partial<ChartOptions>;
  public chartHeatCantidad : Partial<CharOptions>;

  public pieChart : Partial<CharOptions>;
  public chartGraficoCircular : Partial<CharOptions>;

  arregloMontos = [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10];
  arreglo = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  arreglo2 = [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10];
  tipoEntrante = 0;


  arregloTipos = [{"nombreReporte":"Clientes","arriba":[{"tituloArriba1":"Total de Clientes","tituloArriba2":"Clientes nuevos por año","tituloArriba3":"Clientes nuevos este mes","tituloArriba4":"proban5"}],"tituloGrafico1":"hola","tituloGrafico2":"chao","tituloGrafico3":"hola-coca-cola","tituloGrafico4":"chao-pescao"},
                  {"nombreReporte":"Ventas","arriba":[{"tituloArriba1":"probando","tituloArriba2":"proban3","tituloArriba3":"proban4","tituloArriba4":"proban5"}],"tituloGrafico1":"hola","tituloGrafico2":"chao","tituloGrafico3":"hola-coca-cola","tituloGrafico4":"chao-pescao"},
                  {"nombreReporte":"Gastos","arriba":[{"tituloArriba1":"Gastos Totales","tituloArriba2":"Gastos Totales ($)","tituloArriba3":"Gasto Anual","tituloArriba4":"Gasto Mensual"}],"tituloGrafico1":"Cantidad de gastos en el año ($)","tituloGrafico2":"Cantidad de gastos en el año","tituloGrafico3":"Gastos en el año por tipo de gasto ($)","tituloGrafico4":"Gastos en el año por tipo de gasto","tituloGrafico5":"Uso de Factura y Boleta"},
                  {"nombreReporte":"Productos","arriba":[{"tituloArriba1":"hola1","tituloArriba2":"hola2","tituloArriba3":"hola3","tituloArriba4":"hola4"}],"tituloGrafico1":"hola","tituloGrafico2":"chao","tituloGrafico3":"hola-coca-cola","tituloGrafico4":"chao-pescao"},
                  {"nombreReporte":"Cotizaciones","arriba":[{"tituloArriba1":"hola1","tituloArriba2":"hola2","tituloArriba3":"hola3","tituloArriba4":"hola4"}],"tituloGrafico1":"hola","tituloGrafico2":"chao","tituloGrafico3":"hola-coca-cola","tituloGrafico4":"chao-pescao"}
                 ]

  arregloDatos = [

  ];


  nombreGrafico1 = "Gastos";
  dataGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  categoriasGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];


  nombreGrafico2 = "Prueba";
  dataGrafico2 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  categoriasGrafico2 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];


/*
  nombreGrafico1 = "Prueba";
  dataGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  categoriasGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];

  nombreGrafico1 = "Prueba";
  dataGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
  categoriasGrafico1 = [1000,20000,3000,4000,2000,25000,1500,30000,10000,15000,2500,3000];
*/
  constructor(private navParams : NavParams , private modalCtrl : ModalController) {
    console.log(this.arregloTipos);

    var ps = navParams.get("tipoEntrante");
    if(ps){
        this.tipoEntrante = ps;
        console.log(this.tipoEntrante);
      }

    this.chartGrafico1 = {
      series: [
        {
          name: this.nombreGrafico1,
          data: this.dataGrafico1
        },
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          this.arreglo
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

    this.chartGrafico2 = {
      series: [
        {
          name: this.nombreGrafico2,
          data: this.dataGrafico2
        },
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [this.categoriasGrafico2]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

    this.chartHeat1 = {
      series: [
          {
          name: "Enero",
          data: [{
           x: 'Semana 1',
           y: 10000
          }, {
           x: 'Semana 2',
           y: 10000
          }, {
           x: 'Semana 3',
           y: 20000
          }, {
           x: 'Semana 4',
           y: 30000
         },]
          },
          {
          name: "Febrero",
          data: [{
           x: 'Alimentación',
           y: 35000
          }, {
           x: 'Compra de Productos',
           y: 15000
          }, {
           x: 'Capacitaciones',
           y: 15000
          }, {
           x: 'Viajes',
           y: 16000
         }]
        },
        {
        name: "Marzo",
        data: [{
         x: 'Alimentación',
         y: 55000
        }, {
         x: 'Compra de Productos',
         y: 90000
        }, {
         x: 'Capacitaciones',
         y: 25000
        }, {
         x: 'Viajes',
         y: 12000
       }]
      },
      {
      name: "Abril",
      data: [{
       x: 'Alimentación',
       y: 13000
      }, {
       x: 'Compra de Productos',
       y: 32500
      }, {
       x: 'Capacitaciones',
       y: 10000
      }, {
       x: 'Viajes',
       y: 20000
     }]
    },
    {
    name: "Junio",
    data: [{
     x: 'Alimentación',
     y: 22000
    }, {
     x: 'Compra de Productos',
     y: 30000
    }, {
     x: 'Capacitaciones',
     y: 30000
    }, {
     x: 'Viajes',
     y: 43000
   }]
  },
  {
  name: "Julio",
  data: [{
   x: 'Alimentación',
   y: 20000
  }, {
   x: 'Compra de Productos',
   y: 35000
  }, {
   x: 'Capacitaciones',
   y: 25000
  }, {
   x: 'Viajes',
   y: 25000
 }]
  },
  {
  name: "Agosto",
  data: [{
   x: 'Alimentación',
   y: 35000
  }, {
   x: 'Compra de Productos',
   y: 35000
  }, {
   x: 'Capacitaciones',
   y: 15000
  }, {
   x: 'Viajes',
   y: 25000
 }]
  },
  {
  name: "Septiembre",
  data: [{
   x: 'Alimentación',
   y: 40000
  }, {
   x: 'Compra de Productos',
   y: 50000
  }, {
   x: 'Capacitaciones',
   y: 30000
  }, {
   x: 'Viajes',
   y: 40000
 }]
  },
  {
  name: "Octubre",
  data: [{
   x: 'Alimentación',
   y: 33000
  }, {
   x: 'Compra de Productos',
   y: 32000
  }, {
   x: 'Capacitaciones',
   y: 27000
  }, {
   x: 'Viajes',
   y: 22000
 }]
  },
  {
  name: "Noviembre",
  data: [{
   x: 'Alimentación',
   y: 20000
  }, {
   x: 'Compra de Productos',
   y: 25000
  }, {
   x: 'Capacitaciones',
   y: 34000
  }, {
   x: 'Viajes',
   y: 45000
 }]
  },
  {
  name: "Diciembre",
  data: [{
   x: 'Alimentación',
   y: 25000
  }, {
   x: 'Compra de Productos',
   y: 28000
  }, {
   x: 'Capacitaciones',
   y: 35000
  }, {
   x: 'Viajes',
   y: 40500
 }]
  },
           ],
             chart: {
             height: 350,
             type: 'heatmap',
           },
           /*plotOptions: {
             heatmap: {
               shadeIntensity: 0.5,
               radius: 0,
               useFillColorAsStroke: true,
               colorScale: {
                 ranges: [{
                     from: -30,
                     to: 5,
                     name: 'low',
                     color: '#00A100'
                   },
                   {
                     from: 6,
                     to: 20,
                     name: 'medium',
                     color: '#128FD9'
                   },
                   {
                     from: 21,
                     to: 45,
                     name: 'high',
                     color: '#FFB200'
                   },
                   {
                     from: 46,
                     to: 55,
                     name: 'extreme',
                     color: '#FF0000'
                   }
                 ]
               }
             }
           },*/
           dataLabels: {
             enabled: false
           },
           stroke: {
             width: 1
           },
           title: {
             text: 'HeatMap Chart with Color Range'
           },
           };

    this.chartHeatCantidad = {
      series: [
          {
          name: "Enero",
          data: [{
           x: 'Alimentación',
           y: 10
          }, {
           x: 'Compra de Productos',
           y: 15
          }, {
           x: 'Capacitaciones',
           y: 20
          }, {
           x: 'Viajes',
           y: 30
         },
         {
         x: 'Extra',
         y: 40
        }]
          },
          {
          name: "Febrero",
          data: [{
           x: 'Alimentación',
           y: 35
          }, {
           x: 'Compra de Productos',
           y: 15
          }, {
           x: 'Capacitaciones',
           y: 15
          }, {
           x: 'Viajes',
           y: 16
         },
         {
         x: 'Extra',
         y: 17
        }]
        },
        {
        name: "Marzo",
        data: [{
         x: 'Alimentación',
         y: 55
        }, {
         x: 'Compra de Productos',
         y: 90
        }, {
         x: 'Capacitaciones',
         y: 25
        }, {
         x: 'Viajes',
         y: 12
       },
       {
       x: 'Extra',
       y: 35
      }]
      },
      {
      name: "Abril",
      data: [{
       x: 'Alimentación',
       y: 13
      }, {
       x: 'Compra de Productos',
       y: 32
      }, {
       x: 'Capacitaciones',
       y: 10
      }, {
       x: 'Viajes',
       y: 20
     },
     {
     x: 'Extra',
     y: 25
    }]
    },
    {
    name: "Junio",
    data: [{
     x: 'Alimentación',
     y: 22
    }, {
     x: 'Compra de Productos',
     y: 30
    }, {
     x: 'Capacitaciones',
     y: 30
    }, {
     x: 'Viajes',
     y: 43
   },
   {
   x: 'Extra',
   y: 17
  }]
  },
  {
  name: "Julio",
  data: [{
   x: 'Alimentación',
   y: 20
  }, {
   x: 'Compra de Productos',
   y: 35
  }, {
   x: 'Capacitaciones',
   y: 25
  }, {
   x: 'Viajes',
   y: 25
 },
 {
 x: 'Extra',
 y: 30
}]
  },
  {
  name: "Agosto",
  data: [{
   x: 'Alimentación',
   y: 35
  }, {
   x: 'Compra de Productos',
   y: 35
  }, {
   x: 'Capacitaciones',
   y: 15
  }, {
   x: 'Viajes',
   y: 25
 },
 {
 x: 'Extra',
 y: 30
}]
  },
  {
  name: "Septiembre",
  data: [{
   x: 'Alimentación',
   y: 40
  }, {
   x: 'Compra de Productos',
   y: 50
  }, {
   x: 'Capacitaciones',
   y: 30
  }, {
   x: 'Viajes',
   y: 40
 },
 {
 x: 'Extra',
 y: 50
}]
  },
  {
  name: "Octubre",
  data: [{
   x: 'Alimentación',
   y: 33
  }, {
   x: 'Compra de Productos',
   y: 32
  }, {
   x: 'Capacitaciones',
   y: 27
  }, {
   x: 'Viajes',
   y: 22
 },
 {
 x: 'Extra',
 y: 45
}]
  },
  {
  name: "Noviembre",
  data: [{
   x: 'Alimentación',
   y: 20
  }, {
   x: 'Compra de Productos',
   y: 25
  }, {
   x: 'Capacitaciones',
   y: 34
  }, {
   x: 'Viajes',
   y: 45
 },
 {
 x: 'Extra',
 y: 50
}]
  },
  {
  name: "Diciembre",
  data: [{
   x: 'Alimentación',
   y: 25
  }, {
   x: 'Compra de Productos',
   y: 28
  }, {
   x: 'Capacitaciones',
   y: 35
  }, {
   x: 'Viajes',
   y: 40
 },
 {
 x: 'Extra',
 y: 20
}]
  },
           ],
             chart: {
             height: 350,
             type: 'heatmap',
           },
           plotOptions: {
             heatmap: {
               shadeIntensity: 0.5,
               radius: 0,
               useFillColorAsStroke: true,
               colorScale: {
                 ranges: [{
                     from: -30,
                     to: 5,
                     name: 'low',
                     color: '#00A100'
                   },
                   {
                     from: 6,
                     to: 20,
                     name: 'medium',
                     color: '#128FD9'
                   },
                   {
                     from: 21,
                     to: 45,
                     name: 'high',
                     color: '#FFB200'
                   },
                   {
                     from: 46,
                     to: 55,
                     name: 'extreme',
                     color: '#FF0000'
                   }
                 ]
               }
             }
           },
           dataLabels: {
             enabled: false
           },
           stroke: {
             width: 1
           },
           title: {
             text: 'HeatMap Chart with Color Range'
           },
          };

    this.pieChart = {
          series: [44, 55],
          chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 300,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

  }

  ngOnInit() {
  }

  cambiaArreglo(){
    this.arreglo2 = [20, 30, 15, 16, 20, 60, 21, 20, 6, 8, 15, 10];
    console.log(this.arreglo2);
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
