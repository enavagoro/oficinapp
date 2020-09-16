import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteClientesPageRoutingModule } from './reporte-clientes-routing.module';

import { ReporteClientesPage } from './reporte-clientes.page';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteClientesPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ReporteClientesPage]
})
export class ReporteClientesPageModule {}
