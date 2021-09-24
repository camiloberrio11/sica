import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  listItemsForm: FormStep[] = [
    { title: 'Equipo', status: true },
    { title: 'Usuario', status: false },
  ];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  existNext = false;

  constructor() {}

  ngOnInit() {}

  handleNext() {
    this.indexCurrentForm = this.indexCurrentForm + 1;

    this.listItemsForm = this.listItemsForm.map((item) => {
      if (item?.title === this.listItemsForm[this.indexCurrentForm]?.title) {
        item.status = true;
      }
      return item;
    });
    this.existNext =
      this.listItemsForm.filter((item) => item?.status === true)?.length ===
      this.listItemsForm.length;
    if (this.existNext) {
      this.labelBtn = 'Entregar';
    }
  }
}
