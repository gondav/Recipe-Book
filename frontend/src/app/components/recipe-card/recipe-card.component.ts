import { Component, Input, OnInit } from '@angular/core';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: IRecipeViewModel;

  constructor() {}

  ngOnInit(): void {}
}
