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

import { EmpresaService } from './_servicios/empresa.service';
import { UsuarioService } from './_servicios/usuario.service';
import { ClienteService } from './_servicios/cliente.service';
import { ProductoService } from './_servicios/producto.service';
import { TipoGastoService } from './_servicios/tipo-gasto.service';
import { TipoProductoService } from './_servicios/tipo-producto.service';
import { GastoService } from './_servicios/gasto.service';
import { VentaService } from './_servicios/venta.service';
import { CotizacionService } from './_servicios/cotizacion.service';
import { DetalleService } from './_servicios/detalle.service';
import { DetallePage } from './ventas/detalle/detalle.page';
import { DetalleCotizacionPage } from './cotizaciones/detalle-cotizacion/detalle-cotizacion.page';
import { CrearClientePage } from './cotizaciones/crear-cliente/crear-cliente.page';
import { DocumentoPage } from './cotizaciones/documento/documento.page';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppUtilService } from './_servicios/app-util.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AuthGaurdService } from './_servicios/auth-gaurd.service';
import { AuthenticationService } from './_servicios/authentication.service';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './_servicios/storage.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { EmailService } from './_servicios/email.service';

@NgModule({
  declarations: [AppComponent,DetallePage,DetalleCotizacionPage,CrearClientePage,DocumentoPage],
  entryComponents: [DetallePage,DetalleCotizacionPage,CrearClientePage,DocumentoPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxDocViewerModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    AuthGaurdService,
    AuthenticationService,
    AppUtilService,
    //NativeStorage,
    EmpresaService,
    UsuarioService,
    ClienteService,
    ProductoService,
    TipoGastoService,
    TipoProductoService,
    GastoService,
    EmailService,
    StorageService,
    //Storage,
    VentaService,
    CotizacionService,
    DetalleService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
