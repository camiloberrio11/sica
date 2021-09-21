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
      routePath: '',
    },
    {
      title: 'Devolución',
      srcImg: 'assets/img/materiales.svg',
      routePath: '',
    },
    {
      title: 'Preliquidación',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: '',
    },
    {
      title: 'Informes',
      srcImg: 'assets/img/equipopropio.svg',
      routePath: '',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
