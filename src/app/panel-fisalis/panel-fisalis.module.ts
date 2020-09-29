import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelFisalisPageRoutingModule } from './panel-fisalis-routing.module';

import { PanelFisalisPage } from './panel-fisalis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelFisalisPageRoutingModule
  ],
  declarations: [PanelFisalisPage]
})
export class PanelFisalisPageModule {}
