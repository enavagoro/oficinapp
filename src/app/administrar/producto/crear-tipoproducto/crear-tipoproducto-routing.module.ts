import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTipoproductoPage } from './crear-tipoproducto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTipoproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTipoproductoPageRoutingModule {}
