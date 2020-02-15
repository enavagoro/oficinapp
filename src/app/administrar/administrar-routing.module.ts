import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarPage } from './administrar.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarPage
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'tipo-gasto',
    loadChildren: () => import('./tipo-gasto/tipo-gasto.module').then( m => m.TipoGastoPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
  },  {
    path: 'tipo-producto',
    loadChildren: () => import('./tipo-producto/tipo-producto.module').then( m => m.TipoProductoPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarPageRoutingModule {}
