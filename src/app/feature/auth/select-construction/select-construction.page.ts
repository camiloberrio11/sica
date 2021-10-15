import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Construction } from 'src/app/core/models/Construction';
import { ConstructionService } from 'src/app/core/services/construction.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaApiService } from 'src/app/core/services/sica-api.service';

@Component({
  selector: 'app-select-construction',
  templateUrl: './select-construction.page.html',
  styleUrls: ['./select-construction.page.scss'],
})
export class SelectConstructionPage {
  listObras: Construction[] = [];
  constructor(
    private router: Router,
    private sicaService: SicaApiService,
    private loadingService: LoadingService,
    private selectConstructionService: ConstructionService
  ) {}

  ionViewWillEnter() {
    this.getConstruction();
  }

  changeConstruction(event: { detail: { value: Construction } }) {
    console.log(event);
    this.selectConstructionService.setSelectConstruction = event?.detail?.value;
    this.router.navigate(['/auth/select-flow']);
  }

  getConstruction() {
    this.loadingService.initLoading('Cargando construcciones');
    this.sicaService.getConstruiction().subscribe(
      (constr) => {
        this.listObras = constr;
        this.loadingService.endLoading();
      },
      (err) => {
        console.warn(err);
        this.loadingService.endLoading();
      }
    );
  }
}
