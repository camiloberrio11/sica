import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonsMenusFlowComponent } from './buttons-menus-flow/buttons-menus-flow.component';
import { IonicModule } from '@ionic/angular';
import { FormStepsComponent } from './form-steps/form-steps.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonsMenusFlowComponent,
    FormStepsComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ButtonsMenusFlowComponent, FormStepsComponent],
})
export class SharedModule {}
