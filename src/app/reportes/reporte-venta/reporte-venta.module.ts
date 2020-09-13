import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteVentaPageRoutingModule } from './reporte-venta-routing.module';

import { ReporteVentaPage } from './reporte-venta.page';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteVentaPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ReporteVentaPage]
})
export class ReporteVentaPageModule {}
