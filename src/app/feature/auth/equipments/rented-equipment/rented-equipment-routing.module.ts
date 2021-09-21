import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentedEquipmentPage } from './rented-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: RentedEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentedEquipmentPageRoutingModule {}
