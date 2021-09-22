import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-construction',
  templateUrl: './select-construction.page.html',
  styleUrls: ['./select-construction.page.scss'],
})
export class SelectConstructionPage implements OnInit {
  listObras = [
    { title: 'Obra Santa Ana', id: 1 },
    { title: 'Obra Santa Colma', id: 2 },
    { title: 'Luna del mar', id: 3 },
    { title: 'Obra grande', id: 4 },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  changeConstruction(event: any) {
    this.router.navigate(['/auth/select-flow']);
  }
}
