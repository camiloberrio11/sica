import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstructionService } from 'src/app/core/models/Construction';
import { SicaApiService } from 'src/app/core/services/sica-api.service';

@Component({
  selector: 'app-select-construction',
  templateUrl: './select-construction.page.html',
  styleUrls: ['./select-construction.page.scss'],
})
export class SelectConstructionPage {
  listObras: ConstructionService[] = [
    {
      id: '615109cd1c30289790cba5ec',
      code: 'ABC12302',
      name: 'Luna del Mar',
      address: 'calle 122 #45-67',
      phone: '3216549872',
      email: 'lunadelmar@sica.com',
    },
    {
      id: '61510c711c30289790cba5f0',
      code: 'ABC12301',
      name: 'Luna del Viento',
      address: 'calle 121 #45-67',
      phone: '3216549871',
      email: 'lunadelviento@sica.com',
    },
  ];
  constructor(private router: Router, private sicaService: SicaApiService) {}

  ionViewWillEnter() {
    // this.getConstruction();
  }

  changeConstruction(event: any) {
    this.router.navigate(['/auth/select-flow']);
  }

  getConstruction() {
    this.sicaService.getConstruiction().subscribe(
      (constr) => {
        this.listObras = constr;
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
