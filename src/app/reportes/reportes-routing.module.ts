import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesPage } from './reportes.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesPage
  },
  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReportePageModule)
  },  {
    path: 'reporte-venta',
    loadChildren: () => import('./reporte-venta/reporte-venta.module').then( m => m.ReporteVentaPageModule)
  },
  {
    path: 'reporte-clientes',
    loadChildren: () => import('./reporte-clientes/reporte-clientes.module').then( m => m.ReporteClientesPageModule)
  },
  {
    path: 'reporte-gastos',
    loadChildren: () => import('./reporte-gastos/reporte-gastos.module').then( m => m.ReporteGastosPageModule)
  },
  {
    path: 'reporte-productos',
    loadChildren: () => import('./reporte-productos/reporte-productos.module').then( m => m.ReporteProductosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesPageRoutingModule {}
