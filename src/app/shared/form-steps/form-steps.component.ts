import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormStep } from 'src/app/core/models/Formstep';

@Component({
  selector: 'app-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss'],
})
export class FormStepsComponent implements OnInit {
  @Input() listItems: FormStep[];
  @Output() indexCurrent = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  clickFormStep(index: number) {
    this.indexCurrent.emit(index);
  }


  sendCurrentIndex(): void {
  }
}
