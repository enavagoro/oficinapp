import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoGastoPage } from './tipo-gasto.page';

const routes: Routes = [
  {
    path: '',
    component: TipoGastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoGastoPageRoutingModule {}
