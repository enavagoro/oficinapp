import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelLirioPageRoutingModule } from './panel-lirio-routing.module';

import { PanelLirioPage } from './panel-lirio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelLirioPageRoutingModule
  ],
  declarations: [PanelLirioPage]
})
export class PanelLirioPageModule {}
