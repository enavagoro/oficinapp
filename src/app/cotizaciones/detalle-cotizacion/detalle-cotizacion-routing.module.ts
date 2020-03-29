import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCotizacionPage } from './detalle-cotizacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCotizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCotizacionPageRoutingModule {}
