import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'select-construction',
    loadChildren: () =>
      import(
        './feature/auth/select-construction/select-construction.module'
      ).then((m) => m.SelectConstructionPageModule),
  },
  {
    path: 'select-flow',
    loadChildren: () =>
      import('./feature/auth/select-flow/select-flow.module').then(
        (m) => m.SelectFlowPageModule
      ),
  },
  {
    path: 'menu-equipments',
    loadChildren: () =>
      import(
        './feature/auth/equipments/menu-equipments/menu-equipments.module'
      ).then((m) => m.MenuEquipmentsPageModule),
  },
  {
    path: 'loan-equipment',
    loadChildren: () =>
      import(
        './feature/auth/equipments/loan-equipment/loan-equipment.module'
      ).then((m) => m.LoanEquipmentPageModule),
  },
  {
    path: 'loan-equipment/delivery',
    loadChildren: () =>
      import(
        './feature/auth/equipments/loan-equipment/delivery/delivery.module'
      ).then((m) => m.DeliveryPageModule),
  },
  {
    path: 'loan-equipment/return',
    loadChildren: () =>
      import(
        './feature/auth/equipments/loan-equipment/return/return.module'
      ).then((m) => m.ReturnPageModule),
  },
  {
    path: 'loan-equipment/report',
    loadChildren: () =>
      import(
        './feature/auth/equipments/loan-equipment/report/report.module'
      ).then((m) => m.ReportPageModule),
  },
  {
    path: 'own-equipment',
    loadChildren: () =>
      import(
        './feature/auth/equipments/own-equipment/own-equipment.module'
      ).then((m) => m.OwnEquipmentPageModule),
  },
  {
    path: 'rented-equipment',
    loadChildren: () =>
      import(
        './feature/auth/equipments/rented-equipment/rented-equipment.module'
      ).then((m) => m.RentedEquipmentPageModule),
  },
  {
    path: 'rented-equipment/entry',
    loadChildren: () =>
      import(
        './feature/auth/equipments/rented-equipment/entry/entry.module'
      ).then((m) => m.EntryPageModule),
  },
  {
    path: 'rented-equipment/return',
    loadChildren: () =>
      import(
        './feature/auth/equipments/rented-equipment/return/return.module'
      ).then((m) => m.ReturnPageModule),
  },
  {
    path: 'rented-equipment/pre-settlement',
    loadChildren: () =>
      import(
        './feature/auth/equipments/rented-equipment/pre-settlement/pre-settlement.module'
      ).then((m) => m.PreSettlementPageModule),
  },
  {
    path: 'rented-equipment/reports',
    loadChildren: () =>
      import(
        './feature/auth/equipments/rented-equipment/reports/reports.module'
      ).then((m) => m.ReportsPageModule),
  },
  {
    path: 'inventory-equipment',
    loadChildren: () =>
      import(
        './feature/auth/equipments/inventory-equipment/inventory-equipment.module'
      ).then((m) => m.InventoryEquipmentPageModule),
  },
  {
    path: 'maintenance-equipment',
    loadChildren: () =>
      import(
        './feature/auth/equipments/maintenance-equipment/maintenance-equipment.module'
      ).then((m) => m.MaintenanceEquipmentPageModule),
  },
  {
    path: 'own-equipment-main/register',
    loadChildren: () =>
      import(
        './feature/auth/equipments/own-equipment/register/register.module'
      ).then((m) => m.RegisterPageModule),
  },
  {
    path: 'own-equipment-main/history',
    loadChildren: () =>
      import(
        './feature/auth/equipments/own-equipment/history/history.module'
      ).then((m) => m.HistoryPageModule),
  },
  {
    path: 'own-equipment-main/transfer',
    loadChildren: () =>
      import(
        './feature/auth/equipments/own-equipment/transfer/transfer.module'
      ).then((m) => m.TransferPageModule),
  },
  {
    path: 'own-equipment-main/reports',
    loadChildren: () =>
      import(
        './feature/auth/equipments/own-equipment/reports/reports.module'
      ).then((m) => m.ReportsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
