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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasPageRoutingModule {}
