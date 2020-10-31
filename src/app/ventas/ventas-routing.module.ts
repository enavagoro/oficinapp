import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasPage } from './ventas.page';

const routes: Routes = [
  {
    path: '',
    component: VentasPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  },  {
    path: 'crear-cliente-venta',
    loadChildren: () => import('./crear-cliente-venta/crear-cliente-venta.module').then( m => m.CrearClienteVentaPageModule)
  },
  {
    path: 'ver-venta',
    loadChildren: () => import('./ver-venta/ver-venta.module').then( m => m.VerVentaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasPageRoutingModule {}
