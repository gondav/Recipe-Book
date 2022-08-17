import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: IRecipeViewModel;
  isRecipeFavorite = false;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setIsRecipeFavorite();
  }

  setIsRecipeFavorite(): void {
    const favoriteRecipes =
      this.recipeService.getFavoriteRecipesFromLocalStorage();

    if (favoriteRecipes.includes(this.recipe.recipeId)) {
      this.isRecipeFavorite = true;
    }
  }

  toggleFavoriteRecipes() {
    const userId = this.authService.getUserId();
    const recipeId = this.recipe.recipeId;

    this.isRecipeFavorite
      ? this.removeRecipeFromFavorites(recipeId)
      : this.addRecipeToFavorites(userId, recipeId);
  }

  addRecipeToFavorites(userId: number, recipeId: number): void {
    this.recipeService.addFavoriteRecipe({ userId, recipeId }).subscribe({
      next: (_response) => {
        this.recipeService.addFavoriteRecipeToLocalStorage(recipeId);
        this.isRecipeFavorite = true;
      },
      error: (error) => console.log(error),
    });
  }

  removeRecipeFromFavorites(recipeId: number): void {
    this.recipeService.removeRecipeFromFavorites(recipeId).subscribe({
      next: (_response) => {
        this.isRecipeFavorite = false;
        this.recipeService.removeFavoriteRecipeFromLocalStorage(recipeId);
      },
      error: (error) => console.log(error),
    });
  }
}
