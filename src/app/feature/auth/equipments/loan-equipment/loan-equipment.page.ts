import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-equipment',
  templateUrl: './loan-equipment.page.html',
  styleUrls: ['./loan-equipment.page.scss'],
})
export class LoanEquipmentPage implements OnInit {
  listOptions = [
    {
      title: 'Entrega',
      srcImg: 'assets/img/prestamo-logo.svg',
      routePath: 'loan-equipment/delivery'
    },
    {
      title: 'Devolución',
      srcImg: 'assets/img/materiales.svg',
      routePath: 'loan-equipment/return'
    },
    {
      title: 'Informe',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: 'loan-equipment/report'
    },
  ];;

  constructor() { }

  ngOnInit() {
  }

}
