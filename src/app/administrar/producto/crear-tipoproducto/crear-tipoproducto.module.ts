import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTipoproductoPageRoutingModule } from './crear-tipoproducto-routing.module';

import { CrearTipoproductoPage } from './crear-tipoproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTipoproductoPageRoutingModule
  ],
  declarations: [CrearTipoproductoPage]
})
export class CrearTipoproductoPageModule {}
