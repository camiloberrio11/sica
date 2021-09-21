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
      routePath: '/loan-equipment',
    },
    {
      title: 'Mantenimiento',
      srcImg: 'assets/img/materiales.svg',
      routePath: '',
    },
    {
      title: 'Equipo alquilado',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: '/main-auth/rented-equipment-main',
    },
    {
      title: 'Equipo propio',
      srcImg: 'assets/img/equipopropio.svg',
      routePath: '/own-equipment',
    },
    {
      title: 'Inventario',
      srcImg: 'assets/img/inventario.svg',
      routePath: '',
    },
  ];
  constructor() {}

  ngOnInit() {}
}