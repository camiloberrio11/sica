import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-flow',
  templateUrl: './select-flow.page.html',
  styleUrls: ['./select-flow.page.scss'],
})
export class SelectFlowPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  selectMaterials() {
    this.router.navigate(['/auth/main-auth/materials-main']);
  }

  selectEquipment() {
    this.router.navigate(['/auth/menu-equipments']);
  }
}
