import { Component, Input, OnInit } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';

@Component({
  selector: 'app-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss'],
})
export class FormStepsComponent implements OnInit {
  @Input() listItems: FormStep[];
  constructor() {}

  ngOnInit() {}

  clickFormStep() {
    console.log('Clicked in step');
  }
}
