import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-equipments',
  templateUrl: './menu-equipments.page.html',
  styleUrls: ['./menu-equipments.page.scss'],
})
export class MenuEquipmentsPage implements OnInit {
  listOptions = [
    {
      title: 'Préstamo',
      srcImg: 'assets/img/prestamo-logo.svg',
      routePath: 'auth//loan-equipment',
    },
    {
      title: 'Mantenimiento',
      srcImg: 'assets/img/materiales.svg',
      routePath: 'auth//maintenance-equipment',
    },
    {
      title: 'Equipo alquilado',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: 'auth//rented-equipment',
    },
    {
      title: 'Equipo propio',
      srcImg: 'assets/img/equipopropio.svg',
      routePath: 'auth//own-equipment',
    },
    {
      title: 'Inventario',
      srcImg: 'assets/img/inventario.svg',
      routePath: 'auth//inventory-equipment',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
