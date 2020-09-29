import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelFisalisPage } from './panel-fisalis.page';

const routes: Routes = [
  {
    path: '',
    component: PanelFisalisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelFisalisPageRoutingModule {}
