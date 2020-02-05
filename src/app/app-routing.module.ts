import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'transacciones',
    loadChildren: () => import('./transacciones/transacciones.module').then( m => m.TransaccionesPageModule)
  },
  {
    path: 'administrar',
    loadChildren: () => import('./administrar/administrar.module').then( m => m.AdministrarPageModule)
  },  {
    path: 'cotizaciones',
    loadChildren: () => import('./cotizaciones/cotizaciones.module').then( m => m.CotizacionesPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
