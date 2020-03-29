import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizacionesPage } from './cotizaciones.page';

const routes: Routes = [
  {
    path: '',
    component: CotizacionesPage
  }, 
  {
    path: 'detalle-cotizacion',
    loadChildren: () => import('./detalle-cotizacion/detalle-cotizacion.module').then( m => m.DetalleCotizacionPageModule)
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionesPageRoutingModule {}
