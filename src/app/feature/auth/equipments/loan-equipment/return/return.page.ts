import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NFC } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { BarcodeScanResult } from 'src/app/core/models/BarcodeResult';
import { FormStep } from 'src/app/core/models/Formstep';
import { BodyUpdateLoan } from 'src/app/core/models/Loan';
import { ToolResponseService } from 'src/app/core/models/Tool';
import { SicaApiService } from 'src/app/core/services/sica-api.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {
  tool: ToolResponseService;
  readerMode$: Subscription;

  listItemsForm: FormStep[] = [
    { title: 'Equipo', status: true },
    { title: 'Usuario', status: false },
  ];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  existNext = false;

  // Properties
  deliveredBy: string;
  receivedBy: string;
  statusTool: string;
  quantity: number;
  remark: string;
  checked = true;

  constructor(
    private sicaService: SicaApiService,
    private barcodeScanner: BarcodeScanner,
    private toastrService: ToastService,
    private nfc: NFC
  ) {}

  ngOnInit() {}

  currentForm(event: number) {
    this.indexCurrentForm = event;
    const updateList: FormStep[] = [];
    for (let index = 0; index < this.listItemsForm?.length; index++) {
      const status = index <= event;
      const element = this.listItemsForm[index];
      updateList.push({ title: element.title, status });
    }
    this.listItemsForm = updateList;
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

  handleNext() {
    this.listItemsForm = this.listItemsForm.map((item) => {
      if (
        item?.title === this.listItemsForm[this.indexCurrentForm + 1]?.title
      ) {
        item.status = true;
      }
      return item;
    });
    this.updateIndex();
    const statusFinally = this.formFinally();
    if (statusFinally) {
      this.handleReturn();
      return;
    }
    if (this.existNext) {
      this.indexCurrentForm = this.indexCurrentForm - 1;
      this.handleReturn();
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
    this.indexCurrentForm =
      this.listItemsForm.filter((it) => it.status === true)?.length - 1;
  }

  private formFinally(): boolean {
    const statusFinally =
      this.indexCurrentForm ===
      this.listItemsForm.filter((it) => it.status === true)?.length - 1;
    return statusFinally;
  }

  // private returnLoan(): void {
  //   const body: BodyUpdateLoan = {
  //     return: {
  //       deliveredBy: '{{userId2}}',
  //       receivedBy: '{{userId1}}',
  //       detail: {
  //         status: 'bueno',
  //         quantity: 1,
  //       },
  //       remark: '',
  //     },
  //   };
  //   this.sicaService.returnLoan(body, '', '').subscribe(
  //     (loan) => {},
  //     (err) => {
  //       console.warn(err);
  //     }
  //   );
  // }

  private getToolCodeBar(codebar: string): void {
    this.sicaService.getToolByCodeBar(codebar).subscribe(
      (tool) => {
        this.tool = tool;
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  private getUsersByToken(token: string): void {
    this.sicaService.getUserByToken(token).subscribe(
      (usr) => {
        this.deliveredBy = usr.id;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private handleReturn(): void {
    const body: BodyUpdateLoan = {
      return: {
        deliveredBy: this.deliveredBy,
        receivedBy: '616b873b08dbdcc901e43682',
        detail: {
          status: this?.checked ? 'bueno' : 'malo',
          quantity: this.quantity,
        },
        remark: this.remark,
      },
    };
    this.sicaService.returnLoan(body, '61725a59a60d598de3aec7be').subscribe(
      (data) => {
        this.toastrService.createToast(
          'Se ha actualizado el prestamo',
          'success'
        );
      },
      (err) => {
        this.toastrService.createToast(
          'Ha ocurrido un error actualizando el prestamo',
          'danger'
        );
      }
    );
  }
}
