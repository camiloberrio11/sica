import { Component, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';
import { BodyCreateLoan } from 'src/app/core/models/Loan';
import { ToolResponseService } from 'src/app/core/models/Tool';
import { UserResponseService } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaApiService } from 'src/app/core/services/sica-api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanResult } from 'src/app/core/models/BarcodeResult';
import { Subscription } from 'rxjs';
import { NFC } from '@ionic-native/nfc/ngx';

const userTest = {
  codebar: 'ABC12310',
};
const equipmentTest = {};

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  readerMode$: Subscription;
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
  formDelivery: FormGroup;

  // Propertys form
  deliveredBy: string;
  receivedBy: string;
  quantity: number;
  days: number;
  tasks: string;
  remark: string;

  constructor(
    private sicaService: SicaApiService,
    private toastrService: ToastService,
    private barcodeScanner: BarcodeScanner,
    private nfc: NFC
  ) {}

  ngOnInit() {
    this.formBuild();
  }

  activeNfc(): void {
    this.readerMode$ = this.nfc
      .addNdefListener(
        () => {
          console.log('successfully attached ndef listener');
        },
        (err) => {
          console.log('error attaching ndef listener', err);
        }
      )
      .subscribe((event) => {
        const decodeNfc = this.nfc
          .bytesToString(event.tag.ndefMessage[0].payload)
          ?.split('en')
          ?.pop();
        this.getUsersByToken(decodeNfc);
      });
  }

  scanCodeBar() {
    this.barcodeScanner
      .scan()
      .then((barcodeData: BarcodeScanResult) => {
        if (barcodeData?.text) {
          this.getToolCodeBar(barcodeData.text);
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  currentForm(event: number) {
    this.indexCurrentForm = event;
    const updateList: FormStep[] = [];
    for (let index = 0; index < this.listItemsForm?.length; index++) {
      const status = index <= event;
      const element = this.listItemsForm[index];
      updateList.push({ title: element.title, status });
    }
    this.listItemsForm = updateList;
    this.existNext =
      this.listItemsForm.filter((item) => item?.status === true)?.length ===
      this.listItemsForm.length;
    if (this.existNext) {
      this.labelBtn = 'Entregar';
    } else {
      this.labelBtn = 'Continuar';
    }
  }

  getToolCodeBar(codebar: string): void {
    this.sicaService.getToolByCodeBar(codebar).subscribe(
      (tool) => {
        this.tool = tool;
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  handleNext() {
    if (this.labelBtn === 'Entregar') {
      this.createLoan();
      return;
    }
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

  private createLoan(): void {
    const body: BodyCreateLoan = {
      deliveredBy: '616b873b08dbdcc901e43682',
      receivedBy: this.receivedBy,
      quantity: +this.quantity,
      days: +this.days,
      tasks: this.tasks,
      remark: this.remark,
      tool: this.tool?.id,
    };
    this.sicaService.createLoan(body).subscribe(
      (cre) => {
        console.log(cre);
        this.toastrService.createToast('Creado con éxito', 'success');
        this.deliveredBy = '';
        this.receivedBy = '';
        this.quantity = null;
        this.days = null;
        this.tasks = '';
        this.remark = '';
        this.listItemsForm= [
          { title: 'Equipo', status: true },
          { title: 'Usuario', status: false },
        ];
        this.indexCurrentForm = 0;
        this.labelBtn = 'Continuar';
        this.existNext = false;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private formBuild(): void {
    this.formDelivery = new FormGroup({
      codeBarEquipment: new FormControl(''),
      quantity: new FormControl(''),
      days: new FormControl(''),
      receivedBy: new FormControl(''),
      remark: new FormControl(''),
      tasks: new FormControl(''),
    });
  }

  private getUsersByToken(token: string): void {
    this.sicaService.getUserByToken(token).subscribe(
      (usr) => {
        this.receivedBy = usr.id;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
