import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoProductoPageRoutingModule } from './tipo-producto-routing.module';

import { TipoProductoPage } from './tipo-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoProductoPageRoutingModule
  ],
  declarations: [TipoProductoPage]
})
export class TipoProductoPageModule {}
