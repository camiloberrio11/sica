import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanEquipmentPageRoutingModule } from './loan-equipment-routing.module';

import { LoanEquipmentPage } from './loan-equipment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanEquipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [LoanEquipmentPage]
})
export class LoanEquipmentPageModule {}
