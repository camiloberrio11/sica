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
  {
    path: 'rented-equipment',
    loadChildren: () => import('./feature/auth/equipments/rented-equipment/rented-equipment.module').then( m => m.RentedEquipmentPageModule)
  },
  {
    path: 'inventory-equipment',
    loadChildren: () => import('./feature/auth/equipments/inventory-equipment/inventory-equipment.module').then( m => m.InventoryEquipmentPageModule)
  },
  {
    path: 'maintenance-equipment',
    loadChildren: () => import('./feature/auth/equipments/maintenance-equipment/maintenance-equipment.module').then( m => m.MaintenanceEquipmentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
