import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanResult } from 'src/app/core/models/BarcodeResult';
import { FormStep } from 'src/app/core/models/Formstep';
import { ToolResponseService } from 'src/app/core/models/Tool';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaApiService } from 'src/app/core/services/sica-api.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  toolInfo: ToolResponseService;
  itemsForm: FormStep[] = [
    { title: 'Equipo', status: true },
    { title: 'Destino', status: false },
  ];
  listDestiny = [
    { id: 1, title: 'Destino 1' },
    { id: 2, title: 'Destino 2' },
  ];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';
  constructor(
    private barcodeScanner: BarcodeScanner,
    private sicaApiService: SicaApiService,
    private loadingService: LoadingService,
    private toastrService: ToastService
  ) {}

  ngOnInit() {}

  scanCodeBar() {
    this.barcodeScanner
      .scan()
      .then((barcodeData: BarcodeScanResult) => {
        if (barcodeData?.text) {
          this.getInfoByCodeBar(barcodeData.text);
        }
        // this.registerForm.patchValue({ codeBar: barcodeData?.text });
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

  handleNext() {
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
    this.sicaApiService.getToolByCodeBar(codeBar).subscribe(cod => {
      this.toolInfo = cod;
      this.loadingService.endLoading();
    }, err => {
      this.toolInfo = null;
      this.loadingService.endLoading();
      this.toastrService.createToast('Ocurrió un error con el codigo de barras', 'danger');
    });
  }
}
