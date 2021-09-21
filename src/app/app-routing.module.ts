import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./feature/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'select-construction',
    loadChildren: () => import('./feature/auth/select-construction/select-construction.module').then( m => m.SelectConstructionPageModule)
  },
  {
    path: 'select-flow',
    loadChildren: () => import('./feature/auth/select-flow/select-flow.module').then( m => m.SelectFlowPageModule)
  },
  {
    path: 'menu-equipments',
    loadChildren: () => import('./feature/auth/equipments/menu-equipments/menu-equipments.module').then( m => m.MenuEquipmentsPageModule)
  },
  {
    path: 'loan-equipment',
    loadChildren: () => import('./feature/auth/equipments/loan-equipment/loan-equipment.module').then( m => m.LoanEquipmentPageModule)
  },
  {
    path: 'own-equipment',
    loadChildren: () => import('./feature/auth/equipments/own-equipment/own-equipment.module').then( m => m.OwnEquipmentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
