import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryEquipmentPage } from './inventory-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryEquipmentPageRoutingModule {}
