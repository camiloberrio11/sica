import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Subscription } from 'rxjs';
import { BarcodeScanResult } from 'src/app/core/models/BarcodeResult';
import { Construction } from 'src/app/core/models/Construction';
import { FormStep } from 'src/app/core/models/Formstep';
import { Reason } from 'src/app/core/models/Reason';
import { ToolResponseService } from 'src/app/core/models/Tool';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaApiService } from 'src/app/core/services/sica-api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  readingNfc = false;
  readerMode$: Subscription;
  listConstructions: Construction[] = [];
  listReason: Reason[] = [];
  shippingForm: FormGroup;

  toolInfo: ToolResponseService;
  itemsForm: FormStep[] = [
    { title: 'Equipo', status: true },
    { title: 'Destino', status: false },
  ];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  constructor(
    private barcodeScanner: BarcodeScanner,
    private sicaApiService: SicaApiService,
    private loadingService: LoadingService,
    private toastrService: ToastService,
    private nfc: NFC,
    private ndef: Ndef
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getConstructions();
    this.getReason();
  }

  scanCodeBar() {
    this.barcodeScanner
      .scan()
      .then((barcodeData: BarcodeScanResult) => {
        if (barcodeData?.text) {
          this.getInfoByCodeBar(barcodeData.text);
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  currentForm(event: number) {
    this.indexCurrentForm = event;
    const updateList: FormStep[] = [];
    for (let index = 0; index < this.itemsForm?.length; index++) {
      const status = index <= event;
      const element = this.itemsForm[index];
      updateList.push({ title: element.title, status });
    }
    this.itemsForm = updateList;
  }

  activeNfc(): void {
    this.readingNfc = true;
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
        console.log(event);
        const decode = this.nfc
          .bytesToString(event.tag.ndefMessage[0].payload)
          ?.split('en')
          ?.pop();
        this.updateNfcUser(decode);
      });
  }

  handleNext() {
    if (this.labelBtn === 'Finalizar') {
      this.handleMove();
      return;
    }
    this.indexCurrentForm = this.indexCurrentForm + 1;
    this.itemsForm = this.itemsForm.map((item) => {
      if (item?.title === this.itemsForm[this.indexCurrentForm]?.title) {
        item.status = true;
      }
      return item;
    });
    const existNext =
      this.itemsForm.filter((item) => item?.status === true)?.length ===
      this.itemsForm.length;
    if (existNext) {
      this.labelBtn = 'Finalizar';
    }
  }

  private getInfoByCodeBar(codeBar: string): void {
    this.loadingService.initLoading('Obteniendo por codigo de barras');
    this.sicaApiService.getToolByCodeBar(codeBar).subscribe(
      (cod) => {
        this.toolInfo = cod;
        this.loadingService.endLoading();
      },
      (err) => {
        this.toolInfo = null;
        this.loadingService.endLoading();
        this.toastrService.createToast(
          'Ocurrió un error con el codigo de barras',
          'danger'
        );
      }
    );
  }

  private getConstructions(): void {
    this.sicaApiService.getConstruiction().subscribe(
      (cons) => {
        this.listConstructions = cons;
      },
      (err) => {
        this.toastrService.createToast(
          'Ocurrió un error obteniendo construcciones',
          'danger'
        );
      }
    );
  }
  private getReason(): void {
    this.sicaApiService.getReason().subscribe(
      (lstre) => {
        this.listReason = lstre;
      },
      (err) => {
        this.toastrService.createToast(
          'Ocurrió un error trayendo motivos',
          'danger'
        );
      }
    );
  }

  private buildForm(): void {
    this.shippingForm = new FormGroup({
      destination: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required),
      devolutionEstimatedDate: new FormControl('', Validators.required),
      userNfc: new FormControl('', Validators.required),
    });
  }

  private handleMove(): void {
    const values = this.shippingForm?.value;
    console.log(values);
    this.itemsForm = [
      { title: 'Equipo', status: true },
      { title: 'Destino', status: false },
    ];
    this.indexCurrentForm = 0;
    this.labelBtn = 'Continuar';
  }

  private updateNfcUser(codeUser: string): void {
    this.readingNfc = false;
    console.log(codeUser)
    this.shippingForm.patchValue({
      userNfc: codeUser,
    });
    this.readerMode$?.unsubscribe();
  }
}
