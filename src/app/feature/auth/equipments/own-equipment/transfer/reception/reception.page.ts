import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss'],
})
export class ReceptionPage implements OnInit {
  itemsForm: FormStep[] = [
    { title: 'Equipo', status: true },
    { title: 'Destino', status: false },
  ];
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
