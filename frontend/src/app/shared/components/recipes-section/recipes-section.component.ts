import { Component, Input, OnInit } from '@angular/core';
import { IRecipeViewModel } from '../../../shared/models/viewmodels/IRecipeViewModel';

@Component({
  selector: 'app-recipes-section',
  templateUrl: './recipes-section.component.html',
  styleUrls: ['./recipes-section.component.scss'],
})
export class RecipesSectionComponent implements OnInit {
  @Input() recipes: IRecipeViewModel[] = [];
  @Input() sectionTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
