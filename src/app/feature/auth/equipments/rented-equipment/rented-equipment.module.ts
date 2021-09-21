import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentedEquipmentPageRoutingModule } from './rented-equipment-routing.module';

import { RentedEquipmentPage } from './rented-equipment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentedEquipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [RentedEquipmentPage]
})
export class RentedEquipmentPageModule {}
