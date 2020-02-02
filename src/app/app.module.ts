import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { ClienteService } from './_servicios/cliente.service';
import { ProductoService } from './_servicios/producto.service';
import { TipoGastoService } from './_servicios/tipo-gasto.service';
import { GastoService } from './_servicios/gasto.service';
import { VentaService } from './_servicios/venta.service';

import { DetallePage } from './ventas/detalle/detalle.page';

@NgModule({
  declarations: [AppComponent,DetallePage],
  entryComponents: [DetallePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ClienteService,
    ProductoService,
    TipoGastoService,
    GastoService,
    VentaService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
