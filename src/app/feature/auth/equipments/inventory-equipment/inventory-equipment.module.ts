import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryEquipmentPageRoutingModule } from './inventory-equipment-routing.module';

import { InventoryEquipmentPage } from './inventory-equipment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryEquipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [InventoryEquipmentPage]
})
export class InventoryEquipmentPageModule {}
