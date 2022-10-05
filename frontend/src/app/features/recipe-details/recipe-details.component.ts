import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe-service/recipe.service';
import { IDetailedRecipeViewModel } from 'src/app/shared/models/viewmodels/IDetailedRecipeViewModel';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  detailedRecipe: IDetailedRecipeViewModel;
  imgId: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.params['recipeId'];
    this.fetchDetailedRecipe(recipeId);
  }

  fetchDetailedRecipe(recipeId: number): void {
    this.recipeService.getRecipe(recipeId).subscribe({
      next: (detailedRecipe: IDetailedRecipeViewModel) => {
        this.detailedRecipe = detailedRecipe;
        this.imgId = detailedRecipe.basicRecipeDetails.image_id;
      },
    });
  }
}
