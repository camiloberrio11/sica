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
      routePath: ''
    },
    {
      title: 'Devolución',
      srcImg: 'assets/img/materiales.svg',
      routePath: ''
    },
    {
      title: 'Informe',
      srcImg: 'assets/img/equipo-alquilado.svg',
      routePath: ''
    },
  ];;

  constructor() { }

  ngOnInit() {
  }

}
