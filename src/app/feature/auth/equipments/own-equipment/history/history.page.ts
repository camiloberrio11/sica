import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanResult } from 'src/app/core/models/BarcodeResult';
import { ToolResponseService } from 'src/app/core/models/Tool';
import { SicaApiService } from 'src/app/core/services/sica-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  tool: ToolResponseService;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private sicaService: SicaApiService
  ) {}

  ngOnInit() {}

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
}
