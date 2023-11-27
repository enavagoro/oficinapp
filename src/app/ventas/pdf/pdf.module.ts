import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfPageRoutingModule } from './pdf-routing.module';

import { PdfPage } from './pdf.page';
import { SafePipe } from '../../app.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfPageRoutingModule
  ],
  declarations: [PdfPage,SafePipe]
})
export class PdfPageModule {}
