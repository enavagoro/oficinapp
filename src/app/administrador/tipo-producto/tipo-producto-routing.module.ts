import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoProductoPage } from './tipo-producto.page';

const routes: Routes = [
  {
    path: '',
    component: TipoProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoProductoPageRoutingModule {}
