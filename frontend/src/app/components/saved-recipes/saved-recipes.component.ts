import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss'],
})
export class SavedRecipesComponent implements OnInit {
  recipes: IRecipeViewModel[] = [];
  sectionTitle: string = 'SAVED RECIPES';
  userId = 0;

  constructor(private recipeService: RecipeService) {
    this.recipeService.getSavedRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
    });
  }

  ngOnInit(): void {}
}
