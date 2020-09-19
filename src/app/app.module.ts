import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// servicios
import { AuthService } from './_servicios/auth.service';
import { LoginService } from './_servicios/login.service';
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
import { NotificationService } from './_servicios/notification.service';

//Servicios farmaciapp

import { SucursalService } from './_servicios/sucursales.service';
import { StockService } from './_servicios/stock.service';

//pages modales
import { DetallePage } from './ventas/detalle/detalle.page';
import { CrearClienteVentaPage } from './ventas/crear-cliente-venta/crear-cliente-venta.page'
import { CrearTipogastoPage } from './gastos/crear-tipogasto/crear-tipogasto.page'
import { CrearTipoproductoPage } from './administrar/producto/crear-tipoproducto/crear-tipoproducto.page'
import { CrearClientePage } from './cotizaciones/crear-cliente/crear-cliente.page';
import { PermisosPage } from './administrar/usuario/permisos/permisos.page';

//pages
import { ReportePage } from './reportes/reporte/reporte.page';

import { DetalleCotizacionPage } from './cotizaciones/detalle-cotizacion/detalle-cotizacion.page';
import { DocumentoPage } from './cotizaciones/documento/documento.page';
import { PlanesPage } from './tienda/planes/planes.page';

//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppUtilService } from './_servicios/app-util.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
//componentes
import { ControlMessageComponent } from './control-message/control-message.component';

// servicios
import { ValidationService } from './_servicios/validation.service';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './_servicios/storage.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { EmailService } from './_servicios/email.service';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [AppComponent,DetallePage,DetalleCotizacionPage,CrearClientePage,DocumentoPage,ReportePage,CrearClienteVentaPage,PermisosPage,CrearTipogastoPage,CrearTipoproductoPage,CrearClientePage,PlanesPage],
  entryComponents: [DetallePage,DetalleCotizacionPage,CrearClientePage,DocumentoPage,ReportePage,CrearClienteVentaPage,CrearTipogastoPage,PermisosPage,CrearTipoproductoPage,CrearClientePage,PlanesPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgApexchartsModule,
    NgxDocViewerModule,
    TreeModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    AppUtilService,
    //NativeStorage,
    AuthService,
    LoginService,
    EmpresaService,
    UsuarioService,
    ClienteService,
    ProductoService,
    TipoGastoService,
    TipoProductoService,
    NotificationService,
    GastoService,
    EmailService,
    StorageService,
    //servicios farmaciapp - bodegapp
    StockService,
    SucursalService,

    //Storage,
    VentaService,
    CotizacionService,
    DetalleService,
    SucursalService,
    //servicios
    ValidationService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
