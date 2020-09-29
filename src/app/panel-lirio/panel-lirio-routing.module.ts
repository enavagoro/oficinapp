import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelLirioPage } from './panel-lirio.page';

const routes: Routes = [
  {
    path: '',
    component: PanelLirioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelLirioPageRoutingModule {}
