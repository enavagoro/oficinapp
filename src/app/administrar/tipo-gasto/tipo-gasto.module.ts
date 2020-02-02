import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoGastoPageRoutingModule } from './tipo-gasto-routing.module';

import { TipoGastoPage } from './tipo-gasto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoGastoPageRoutingModule
  ],
  declarations: [TipoGastoPage]
})
export class TipoGastoPageModule {}
