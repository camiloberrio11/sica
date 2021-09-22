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
      routePath: 'auth/loan-equipment/delivery',
    },
    {
      title: 'Devolución',
      srcImg: 'assets/img/materiales.svg',
      routePath: 'auth/loan-equipment/return',
    },
    {
      title: 'Informe',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: 'auth/loan-equipment/report',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
