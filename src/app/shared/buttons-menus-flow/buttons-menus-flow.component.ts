import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons-menus-flow',
  templateUrl: './buttons-menus-flow.component.html',
  styleUrls: ['./buttons-menus-flow.component.scss'],
})
export class ButtonsMenusFlowComponent implements OnInit {
  @Input() srcImg: string;
  @Input() title: string;
  @Input() routePath: string;


  constructor(private router: Router) {}

  ngOnInit() {}

  handleClick(): void {
    this.router.navigate([this.routePath]);
  }
}
