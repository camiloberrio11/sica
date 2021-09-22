import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'select-construction',
        loadChildren: () =>
          import('./select-construction/select-construction.module').then(
            (m) => m.SelectConstructionPageModule
          ),
      },
      {
        path: 'select-flow',
        loadChildren: () =>
          import('./select-flow/select-flow.module').then(
            (m) => m.SelectFlowPageModule
          ),
      },
      {
        path: 'menu-equipments',
        loadChildren: () =>
          import('./equipments/menu-equipments/menu-equipments.module').then(
            (m) => m.MenuEquipmentsPageModule
          ),
      },
      {
        path: 'loan-equipment',
        loadChildren: () =>
          import('./equipments/loan-equipment/loan-equipment.module').then(
            (m) => m.LoanEquipmentPageModule
          ),
      },
      {
        path: 'loan-equipment/delivery',
        loadChildren: () =>
          import('./equipments/loan-equipment/delivery/delivery.module').then(
            (m) => m.DeliveryPageModule
          ),
      },
      {
        path: 'loan-equipment/return',
        loadChildren: () =>
          import('./equipments/loan-equipment/return/return.module').then(
            (m) => m.ReturnPageModule
          ),
      },
      {
        path: 'loan-equipment/report',
        loadChildren: () =>
          import('./equipments/loan-equipment/report/report.module').then(
            (m) => m.ReportPageModule
          ),
      },
      {
        path: 'own-equipment',
        loadChildren: () =>
          import('./equipments/own-equipment/own-equipment.module').then(
            (m) => m.OwnEquipmentPageModule
          ),
      },
      {
        path: 'rented-equipment',
        loadChildren: () =>
          import('./equipments/rented-equipment/rented-equipment.module').then(
            (m) => m.RentedEquipmentPageModule
          ),
      },
      {
        path: 'rented-equipment/entry',
        loadChildren: () =>
          import('./equipments/rented-equipment/entry/entry.module').then(
            (m) => m.EntryPageModule
          ),
      },
      {
        path: 'rented-equipment/return',
        loadChildren: () =>
          import('./equipments/rented-equipment/return/return.module').then(
            (m) => m.ReturnPageModule
          ),
      },
      {
        path: 'rented-equipment/pre-settlement',
        loadChildren: () =>
          import(
            './equipments/rented-equipment/pre-settlement/pre-settlement.module'
          ).then((m) => m.PreSettlementPageModule),
      },
      {
        path: 'rented-equipment/reports',
        loadChildren: () =>
          import('./equipments/rented-equipment/reports/reports.module').then(
            (m) => m.ReportsPageModule
          ),
      },
      {
        path: 'inventory-equipment',
        loadChildren: () =>
          import(
            './equipments/inventory-equipment/inventory-equipment.module'
          ).then((m) => m.InventoryEquipmentPageModule),
      },
      {
        path: 'maintenance-equipment',
        loadChildren: () =>
          import(
            './equipments/maintenance-equipment/maintenance-equipment.module'
          ).then((m) => m.MaintenanceEquipmentPageModule),
      },
      {
        path: 'own-equipment-main/register',
        loadChildren: () =>
          import('./equipments/own-equipment/register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'own-equipment-main/history',
        loadChildren: () =>
          import('./equipments/own-equipment/history/history.module').then(
            (m) => m.HistoryPageModule
          ),
      },
      {
        path: 'own-equipment-main/transfer',
        loadChildren: () =>
          import('./equipments/own-equipment/transfer/transfer.module').then(
            (m) => m.TransferPageModule
          ),
      },
      {
        path: 'own-equipment-main/transfer/reception',
        loadChildren: () =>
          import(
            './equipments/own-equipment/transfer/reception/reception.module'
          ).then((m) => m.ReceptionPageModule),
      },
      {
        path: 'own-equipment-main/transfer/shipping',
        loadChildren: () =>
          import(
            './equipments/own-equipment/transfer/shipping/shipping.module'
          ).then((m) => m.ShippingPageModule),
      },
      {
        path: 'own-equipment-main/reports',
        loadChildren: () =>
          import('./equipments/own-equipment/reports/reports.module').then(
            (m) => m.ReportsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
