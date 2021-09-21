import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonsMenusFlowComponent } from './buttons-menus-flow/buttons-menus-flow.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HeaderComponent, ButtonsMenusFlowComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[HeaderComponent, ButtonsMenusFlowComponent]
})
export class SharedModule { }
