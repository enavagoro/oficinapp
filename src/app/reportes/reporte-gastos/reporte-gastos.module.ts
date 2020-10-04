import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteGastosPageRoutingModule } from './reporte-gastos-routing.module';

import { ReporteGastosPage } from './reporte-gastos.page';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteGastosPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ReporteGastosPage]
})
export class ReporteGastosPageModule {}
