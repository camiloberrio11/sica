import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rented-equipment',
  templateUrl: './rented-equipment.page.html',
  styleUrls: ['./rented-equipment.page.scss'],
})
export class RentedEquipmentPage implements OnInit {
  listOptions = [
    {
      title: 'Ingreso',
      srcImg: 'assets/img/prestamo-logo.svg',
      routePath: 'rented-equipment/entry',
    },
    {
      title: 'Devolución',
      srcImg: 'assets/img/materiales.svg',
      routePath: 'rented-equipment/return',
    },
    {
      title: 'Preliquidación',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: 'rented-equipment/pre-settlement',
    },
    {
      title: 'Informes',
      srcImg: 'assets/img/equipopropio.svg',
      routePath: 'rented-equipment/reports',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
