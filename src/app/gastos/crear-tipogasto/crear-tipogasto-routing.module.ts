import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTipogastoPage } from './crear-tipogasto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTipogastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTipogastoPageRoutingModule {}
