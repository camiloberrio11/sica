import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnEquipmentPage } from './own-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: OwnEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnEquipmentPageRoutingModule {}
