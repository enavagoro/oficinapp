import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearClienteVentaPage } from './crear-cliente-venta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearClienteVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearClienteVentaPageRoutingModule {}
