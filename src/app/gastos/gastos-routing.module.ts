import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosPage } from './gastos.page';

const routes: Routes = [
  {
    path: '',
    component: GastosPage
  },  {
    path: 'crear-tipogasto',
    loadChildren: () => import('./crear-tipogasto/crear-tipogasto.module').then( m => m.CrearTipogastoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastosPageRoutingModule {}
