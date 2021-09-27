import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  itemsForm: FormStep[] = [
    { title: 'Fotos', status: true },
    { title: 'Destino', status: false },
  ];
  listDestiny = [{id: 1, title: 'Destino 1'}, {id: 2, title: 'Destino 2'}];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  constructor() { }

  ngOnInit() {
  }

  handleNext() {
    this.indexCurrentForm = this.indexCurrentForm + 1;
    this.itemsForm = this.itemsForm.map(item => {
      if (item?.title === this.itemsForm[this.indexCurrentForm]?.title) {
        item.status = true;
      }
      return item;
    });
    const existNext = this.itemsForm.filter(item => item?.status === true)?.length === this.itemsForm.length;
    if (existNext) {
      this.labelBtn = 'Finalizar';
    }
  }

}
