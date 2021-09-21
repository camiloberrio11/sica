import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectFlowPageRoutingModule } from './select-flow-routing.module';

import { SelectFlowPage } from './select-flow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectFlowPageRoutingModule
  ],
  declarations: [SelectFlowPage]
})
export class SelectFlowPageModule {}
