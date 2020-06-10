import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearClienteVentaPageRoutingModule } from './crear-cliente-venta-routing.module';

import { CrearClienteVentaPage } from './crear-cliente-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearClienteVentaPageRoutingModule
  ],
  declarations: [CrearClienteVentaPage]
})
export class CrearClienteVentaPageModule {}
