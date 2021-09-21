import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceEquipmentPage } from './maintenance-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceEquipmentPageRoutingModule {}
