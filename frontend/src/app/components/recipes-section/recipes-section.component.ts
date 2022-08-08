import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe-service/recipe.service';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';

@Component({
  selector: 'app-recipes-section',
  templateUrl: './recipes-section.component.html',
  styleUrls: ['./recipes-section.component.scss'],
})
export class RecipesSectionComponent implements OnInit {
  recipes: IRecipeViewModel[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => (this.recipes = recipes),
      error: (error) => console.log(error.status, error.message),
    });
  }
}
