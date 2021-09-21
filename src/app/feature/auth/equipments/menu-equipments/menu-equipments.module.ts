import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEquipmentsPageRoutingModule } from './menu-equipments-routing.module';

import { MenuEquipmentsPage } from './menu-equipments.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEquipmentsPageRoutingModule,
    SharedModule
  ],
  declarations: [MenuEquipmentsPage]
})
export class MenuEquipmentsPageModule {}
