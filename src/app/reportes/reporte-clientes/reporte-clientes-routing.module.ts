import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteClientesPage } from './reporte-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteClientesPageRoutingModule {}
