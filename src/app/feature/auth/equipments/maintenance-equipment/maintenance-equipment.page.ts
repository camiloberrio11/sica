import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';

@Component({
  selector: 'app-maintenance-equipment',
  templateUrl: './maintenance-equipment.page.html',
  styleUrls: ['./maintenance-equipment.page.scss'],
})
export class MaintenanceEquipmentPage implements OnInit {
  listItemsForm: FormStep[] = [{title: 'Equipo', status: true}, {title: 'Proveedor', status: false}];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  existNext = false;
  constructor() { }

  ngOnInit() {
  }

  handleNext() {
    this.indexCurrentForm = this.indexCurrentForm + 1;

    this.listItemsForm = this.listItemsForm.map(item => {
      if (item?.title === this.listItemsForm[this.indexCurrentForm]?.title) {
        item.status = true;
      }
      return item;
    });
    this.existNext = this.listItemsForm.filter(item => item?.status === true)?.length === this.listItemsForm.length;
    if (this.existNext) {
      this.labelBtn = 'Guardar';
    }
  }

}
