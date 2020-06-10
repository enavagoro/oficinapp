import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTipogastoPageRoutingModule } from './crear-tipogasto-routing.module';

import { CrearTipogastoPage } from './crear-tipogasto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTipogastoPageRoutingModule
  ],
  declarations: [CrearTipogastoPage]
})
export class CrearTipogastoPageModule {}
