import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-own-equipment',
  templateUrl: './own-equipment.page.html',
  styleUrls: ['./own-equipment.page.scss'],
})
export class OwnEquipmentPage implements OnInit {
  listOptions = [
    {
      title: 'Registro',
      srcImg: 'assets/img/prestamo-logo.svg',
      routePath: '/main-auth/own-equipment-main/register',
    },
    {
      title: 'Traslado',
      srcImg: 'assets/img/materiales.svg',
      routePath: '/main-auth/own-equipment-main/transfer',
    },
    {
      title: 'Hoja de vida',
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
