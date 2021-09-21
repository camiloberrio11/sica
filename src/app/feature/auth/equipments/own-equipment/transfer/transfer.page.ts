import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  listOptions = [
    {
      title: 'Recepción',
      srcImg: 'assets/img/puerta.png',
      routePath: '/own-equipment-main/register',
    },
    {
      title: 'Envío',
      srcImg: 'assets/img/carrollave.png',
      routePath: '/own-equipment-main/register',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
