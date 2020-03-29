import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCotizacionPageRoutingModule } from './detalle-cotizacion-routing.module';

import { DetalleCotizacionPage } from './detalle-cotizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCotizacionPageRoutingModule
  ],
  declarations: [DetalleCotizacionPage]
})
export class DetalleCotizacionPageModule {}
