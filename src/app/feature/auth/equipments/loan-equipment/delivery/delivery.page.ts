import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';
import { BodyCreateLoan } from 'src/app/core/models/Loan';
import { ToolResponseService } from 'src/app/core/models/Tool';
import { UserResponseService } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaApiService } from 'src/app/core/services/sica-api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoadingController } from '@ionic/angular';


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
  tool: ToolResponseService;
  user: UserResponseService;
  loaderLib: HTMLIonLoadingElement;


  constructor(
    private sicaService: SicaApiService,
    private toastrService: ToastService,
  ) {}

  ngOnInit() {
    this.getToolCodeBar();
    this.getUsersByToken();
  }

  getUsersByToken(): void {
    this.sicaService.getUserByToken('abc32101').subscribe(
      (usr) => {
        this.user = usr;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getToolCodeBar(): void {
    this.sicaService.getToolByCodeBar('ABC123').subscribe(
      (tool) => {
        this.tool = tool;
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  handleNext() {
    this.indexCurrentForm = this.indexCurrentForm + 1;

    this.listItemsForm = this.listItemsForm.map((item) => {
      if (item?.title === this.listItemsForm[this.indexCurrentForm]?.title) {
        item.status = true;
      }
      return item;
    });
    if (this.existNext) {
      this.createLoan();
      this.indexCurrentForm = this.indexCurrentForm - 1;

      return;
    }
    this.existNext =
      this.listItemsForm.filter((item) => item?.status === true)?.length ===
      this.listItemsForm.length;
    if (this.existNext) {
      this.labelBtn = 'Entregar';
    }
  }

  private createLoan(): void {
    const body: BodyCreateLoan = {
      deliveredBy: '6151e8314cfcd6faa44d846a',
      receivedBy: this.user?.id,
      quantity: 1,
      days: 8,
      tasks: 'terminar acabados obra gris',
      remark: '',
      tool: this.tool?.id,
    };
    this.sicaService.createLoan(body).subscribe(
      (cre) => {
        console.log(cre);
        this.toastrService.createToast('Creado con éxito', 'success');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
