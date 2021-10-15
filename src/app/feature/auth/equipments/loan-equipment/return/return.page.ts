import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';
import { BodyUpdateLoan } from 'src/app/core/models/Loan';
import { SicaApiService } from 'src/app/core/services/sica-api.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {
  listItemsForm: FormStep[] = [
    { title: 'Equipo', status: true },
    { title: 'Usuario', status: false },
  ];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  existNext = false;
  constructor(private sicaService: SicaApiService) {}

  ngOnInit() {}

  currentForm(event: number) {
    this.indexCurrentForm = event;
    const updateList: FormStep[] = [];
    for (let index = 0; index < this.listItemsForm?.length; index++) {
      const status = index <= event;
      const element = this.listItemsForm[index];
      updateList.push({title: element.title, status});
    }
    this.listItemsForm = updateList;
  }

  handleNext() {
    this.listItemsForm = this.listItemsForm.map((item) => {
      if (item?.title === this.listItemsForm[this.indexCurrentForm + 1]?.title) {
        item.status = true;
      }
      return item;
    });
    this.updateIndex();
    const statusFinally = this.formFinally();
    if (statusFinally) {
      this.returnLoan();
      return;
    }
    if (this.existNext ) {
      this.indexCurrentForm = this.indexCurrentForm - 1;
      this.returnLoan();
      return;
    }
    this.existNext =
      this.listItemsForm.filter((item) => item?.status === true)?.length ===
      this.listItemsForm.length;
    if (this.existNext) {
      this.labelBtn = 'Entregar';
    }
  }

  private updateIndex(): void {
    this.indexCurrentForm = this.listItemsForm.filter(it => it.status === true)?.length -1;
  }

  private formFinally(): boolean {
    const statusFinally = this.indexCurrentForm === this.listItemsForm.filter(it => it.status === true)?.length -1;
    return statusFinally;
  }

  private returnLoan(): void {
    const body: BodyUpdateLoan = {
      return: {
        deliveredBy: '{{userId2}}',
        receivedBy: '{{userId1}}',
        detail: {
          status: 'bueno',
          quantity: 1,
        },
        remark: '',
      },
    };
    this.sicaService.returnLoan(body, '', '').subscribe(
      (loan) => {},
      (err) => {
        console.warn(err);
      }
    );
  }
}
