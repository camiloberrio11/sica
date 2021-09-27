import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loaderLib: HTMLIonLoadingElement;
  constructor(public loadingCtrl: LoadingController) {}

  async initLoading(message: string) {
    this.loaderLib = await this.loadingCtrl.create({
      message,
      keyboardClose: false,
      spinner: 'lines',
      animated: true,
    });
    await this.loaderLib.present();
  }

  async endLoading(): Promise<void> {
    console.log(this.loaderLib)
    await this.loaderLib?.dismiss();
  }
}
