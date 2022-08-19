import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { RecipeService } from '../../core/services/recipe-service/recipe.service';
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
    private authService: AuthService,
    private router: Router
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

  toggleFavoriteRecipes(): void {
    const userId = this.authService.getUserId();
    const recipeId = this.recipe.recipeId;

    this.isRecipeFavorite
      ? this.removeRecipeFromFavorites(recipeId)
      : this.addRecipeToFavorites(userId, recipeId);
  }

  addRecipeToFavorites(userId: number, recipeId: number): void {
    this.recipeService.addRecipeToFavorites({ userId, recipeId }).subscribe({
      next: (_response) => {
        this.recipeService.addFavoriteRecipeToLocalStorage(recipeId);
        this.isRecipeFavorite = true;
        this.recipeService.isRecipeFavorite.next(true);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  removeRecipeFromFavorites(recipeId: number): void {
    this.recipeService.removeRecipeFromFavorites(recipeId).subscribe({
      next: (_response) => {
        this.recipeService.removeFavoriteRecipeFromLocalStorage(recipeId);
        this.isRecipeFavorite = false;
        this.recipeService.isRecipeFavorite.next(false);
      },
      error: (error) => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
