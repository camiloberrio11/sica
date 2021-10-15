import { Injectable } from '@angular/core';
import { Construction } from '../models/Construction';

@Injectable({
  providedIn: 'root',
})
export class ConstructionService {
  constructionSelected: Construction;

  constructor() {}

  set setSelectConstruction(construction: Construction) {
    this.constructionSelected = construction;
  }

  get getSelectConstruction(): Construction {
    return this.constructionSelected;
  }
}
