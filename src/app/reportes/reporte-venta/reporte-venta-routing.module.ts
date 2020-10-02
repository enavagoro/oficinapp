import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteVentaPage } from './reporte-venta.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteVentaPageRoutingModule {}
